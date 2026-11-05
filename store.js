// Storage layer.
// - Cloud mode (config.js has Supabase URL + key): shared state for the whole team, live updates, login required.
// - Local mode (no config): everything is saved in this browser only (localStorage).
//
// State is stored as small key/value rows so two people editing different things never overwrite each other:
//   check:<checklistId>:<index>  -> true/false
//   custom:<checklistId>         -> [{text, done}]
//   notes:<pageId>               -> "text"
//   status:<projectId>           -> "Idea" | ...
//   table:roles|budget|pipeline  -> [rows]
window.Store = (() => {
  const LOCAL_KEY = "startup-hq-state-v1";
  const TABLE = "kv";
  const cfg = window.STARTUP_CONFIG || {};
  const cloud = !!(cfg.supabaseUrl && cfg.supabaseAnonKey);
  let sb = null, state = null, email = null, onRemote = () => {};
  const timers = {}, pending = new Set();

  // ---------- key <-> state mapping ----------
  const split = (key) => { const i = key.indexOf(":"); return [key.slice(0, i), key.slice(i + 1)]; };
  function getKV(st, key) {
    const [type, id] = split(key);
    if (type === "check") return !!st.checks[id];
    if (type === "custom") return st.custom[id] || [];
    if (type === "notes") return st.notes[id] || "";
    if (type === "status") return st.status[id] ?? null;
    if (type === "table") return st[id] || [];
  }
  function applyKV(st, key, value) {
    const [type, id] = split(key);
    const map = { check: "checks", custom: "custom", notes: "notes", status: "status" }[type];
    if (map) { if (value === null || value === undefined) delete st[map][id]; else st[map][id] = value; }
    else if (type === "table" && ["roles", "budget", "pipeline"].includes(id)) st[id] = Array.isArray(value) ? value : [];
  }
  function allKeys(st) {
    return [
      ...Object.keys(st.checks).filter((k) => st.checks[k]).map((k) => "check:" + k),
      ...Object.keys(st.custom).map((k) => "custom:" + k),
      ...Object.keys(st.notes).filter((k) => st.notes[k]).map((k) => "notes:" + k),
      ...Object.keys(st.status).map((k) => "status:" + k),
      "table:roles", "table:budget", "table:pipeline",
    ];
  }
  const readLocal = () => { try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || "null"); } catch { return null; } };
  const hasData = (s) => s && (Object.keys(s.checks || {}).length || Object.keys(s.notes || {}).length || (s.pipeline || []).length || (s.roles || []).length);

  // ---------- login screen ----------
  function loginScreen() {
    return new Promise((resolve) => {
      const el = document.createElement("div");
      el.id = "login";
      el.innerHTML = `<form class="login-card">
          <div class="logo">S</div>
          <h2>Startup HQ</h2>
          <p>Sign in with the account the team admin created for you.</p>
          <input type="email" name="email" placeholder="Email" required autocomplete="username">
          <input type="password" name="password" placeholder="Password" required autocomplete="current-password">
          <button>Sign in</button>
          <div class="login-err"></div>
        </form>`;
      document.body.appendChild(el);
      const form = el.querySelector("form");
      form.onsubmit = async (e) => {
        e.preventDefault();
        const btn = form.querySelector("button"); btn.disabled = true; btn.textContent = "Signing in…";
        const { data, error } = await sb.auth.signInWithPassword({ email: form.email.value.trim(), password: form.password.value });
        btn.disabled = false; btn.textContent = "Sign in";
        if (error) { form.querySelector(".login-err").textContent = error.message; return; }
        el.remove(); resolve(data.session);
      };
    });
  }

  // ---------- cloud ----------
  async function loadCloud(defaults) {
    const { data, error } = await sb.from(TABLE).select("key,value");
    if (error) throw error;
    const st = defaults();
    data.forEach((r) => applyKV(st, r.key, r.value));
    return { st, empty: data.length === 0 };
  }
  async function writeKeys(keys) {
    if (!keys.length) return;
    const now = new Date().toISOString();
    const rows = keys.map((key) => ({ key, value: getKV(state, key), updated_at: now, updated_by: email }));
    const { error } = await sb.from(TABLE).upsert(rows);
    if (error) { console.error(error); status("Save failed — " + error.message, true); }
    else status("Saved");
  }
  let statusTimer;
  function status(text, bad) {
    const el = document.getElementById("sync"); if (!el) return;
    el.textContent = text; el.classList.toggle("bad", !!bad);
    clearTimeout(statusTimer);
    if (!bad) statusTimer = setTimeout(() => (el.textContent = "Synced · " + email), 1500);
  }

  return {
    get cloud() { return cloud; },
    get email() { return email; },

    async init(defaults, onRemoteChange) {
      onRemote = onRemoteChange;
      if (!cloud) {
        state = Object.assign(defaults(), readLocal() || {});
        return state;
      }
      if (!window.supabase) throw new Error("Could not load the Supabase library — check your internet connection.");
      sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
      let { data: { session } } = await sb.auth.getSession();
      if (!session) session = await loginScreen();
      email = session.user.email;

      const { st, empty } = await loadCloud(defaults);
      state = st;
      const local = readLocal();
      if (empty && hasData(local) && confirm("The shared workspace is empty. Upload the progress saved in this browser?")) {
        state = Object.assign(defaults(), local);
        await writeKeys(allKeys(state));
      }

      sb.channel("kv-changes")
        .on("postgres_changes", { event: "*", schema: "public", table: TABLE }, (p) => {
          const key = (p.new && p.new.key) || (p.old && p.old.key);
          if (!key || pending.has(key)) return; // our own unsaved edit wins
          applyKV(state, key, p.eventType === "DELETE" ? null : p.new.value);
          onRemote();
        })
        .subscribe();
      return state;
    },

    // Save changed keys. delay > 0 debounces (for typing).
    persist(keys, delay = 0) {
      if (!cloud) { localStorage.setItem(LOCAL_KEY, JSON.stringify(state)); return; }
      keys.forEach((k) => {
        pending.add(k);
        clearTimeout(timers[k]);
        status("Saving…");
        timers[k] = setTimeout(async () => { await writeKeys([k]); pending.delete(k); }, delay);
      });
    },

    // Replace everything (import / reset).
    async replaceAll(newState) {
      state = newState;
      if (!cloud) { localStorage.setItem(LOCAL_KEY, JSON.stringify(state)); return state; }
      const { error } = await sb.from(TABLE).delete().neq("key", "");
      if (error) { alert("Could not clear shared data: " + error.message); return state; }
      await writeKeys(allKeys(state));
      return state;
    },

    async signOut() { if (sb) { await sb.auth.signOut(); location.reload(); } },
  };
})();

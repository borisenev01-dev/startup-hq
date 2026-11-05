(async function () {
  const P = window.PLATFORM;

  // ---------- State ----------
  const defaultState = () => ({
    checks: {},          // "checklistId:index" -> true
    custom: {},          // checklistId -> [{text, done}]
    notes: {},           // pageId -> text
    status: {},          // projectId -> status
    roles: [],           // [{name, role}]
    budget: [],          // [{item, cost}]
    pipeline: [],        // [{company, contact, project, stage, value, notes}]
  });
  let state = defaultState();
  const save = (keys, delay) => Store.persist(keys, delay);

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (sel, el = document) => el.querySelector(sel);

  // ---------- Index ----------
  const pages = {};
  P.groups.forEach((g) => g.pages.forEach((p) => (pages[p.id] = { ...p, group: g.title })));
  P.projects.forEach((p) => (pages["project-" + p.id] = { ...p, kind: "project", group: "Projects" }));

  function checklistsOf(page) {
    if (page.kind === "project") return [{ id: "mvp-" + page.id, items: page.mvp }];
    return (page.blocks || []).filter((b) => b.type === "checklist");
  }
  function progress(page) {
    let total = 0, done = 0;
    checklistsOf(page).forEach((c) => {
      c.items.forEach((_, i) => { total++; if (state.checks[c.id + ":" + i]) done++; });
      (state.custom[c.id] || []).forEach((t) => { total++; if (t.done) done++; });
    });
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  // ---------- Sidebar ----------
  function renderNav() {
    const nav = $("#nav");
    let html = "";
    P.groups.forEach((g) => {
      html += `<div class="nav-group"><div class="nav-title">${esc(g.title)}</div>`;
      g.pages.forEach((p) => (html += navItem(p.id, p.icon, p.title, p.kind === "dashboard" ? null : progress(pages[p.id]))));
      html += `</div>`;
    });
    html += `<div class="nav-group"><div class="nav-title">Projects</div>`;
    P.projects.forEach((p) => (html += navItem("project-" + p.id, p.icon, p.title, progress(pages["project-" + p.id]))));
    html += `</div>`;
    nav.innerHTML = html;
    highlightNav();
  }
  function navItem(id, icon, title, prog) {
    const badge = prog && prog.total ? `<span class="nav-pct">${prog.pct}%</span>` : "";
    return `<a class="nav-item" href="#${id}" data-id="${id}"><span class="nav-icon">${icon}</span><span class="nav-label">${esc(title)}</span>${badge}</a>`;
  }
  function highlightNav() {
    const cur = currentId();
    document.querySelectorAll(".nav-item").forEach((a) => a.classList.toggle("active", a.dataset.id === cur));
  }

  // ---------- Routing ----------
  // Hash format: #pageId or #pageId/tab (tabs used on project pages)
  const currentId = () => (location.hash.slice(1) || "dashboard").split("/")[0];
  const currentTab = () => (location.hash.slice(1).split("/")[1] || "overview");
  function route() {
    const page = pages[currentId()] || pages.dashboard;
    const main = $("#main");
    main.innerHTML = page.kind === "dashboard" ? renderDashboard() : page.kind === "project" ? renderProject(page, currentTab()) : renderPage(page);
    main.scrollTop = 0;
    highlightNav();
    document.body.classList.remove("nav-open");
  }

  // ---------- Pages ----------
  function header(page, extra = "") {
    const prog = progress(page);
    const bar = prog.total ? `<div class="page-progress"><div class="bar"><div style="width:${prog.pct}%"></div></div><span>${prog.done}/${prog.total} done</span></div>` : "";
    return `<header class="page-head"><div class="crumb">${esc(page.group)}</div><h1><span class="h-icon">${page.icon}</span>${esc(page.title)}</h1>${page.intro || page.tagline ? `<p class="intro">${esc(page.intro || page.tagline)}</p>` : ""}${extra}${bar}</header>`;
  }

  function renderPage(page) {
    return header(page) + `<div class="blocks">${(page.blocks || []).map(renderBlock).join("")}${notesBlock(page.id)}</div>`;
  }

  function renderBlock(b) {
    switch (b.type) {
      case "checklist": return checklist(b.id, b.title, b.items);
      case "list": return card(b.title, `<ul class="list">${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`);
      case "callout": return `<div class="callout ${b.tone}"><strong>${esc(b.title)}</strong><p>${esc(b.text)}</p></div>`;
      case "table": return card(b.title, `<div class="table-wrap"><table><thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      case "steps": return card(b.title, `<div class="steps">${b.items.map((s) => `<div class="step"><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></div>`).join("")}</div>`);
      case "cards": return `<div class="grid">${b.items.map((c) => `<div class="mini-card"><h4>${esc(c.title)}</h4><p>${esc(c.text)}</p></div>`).join("")}</div>`;
      case "roles": return editableTable("roles", b.title, [["name", "Founder", "text"], ["role", "Role / responsibility", "text"]]);
      case "budget": {
        const total = state.budget.reduce((s, r) => s + (parseFloat(r.cost) || 0), 0);
        return editableTable("budget", b.title, [["item", "Item", "text"], ["cost", "€ / month", "number"]], `<div class="total">Total: <strong>€${total.toFixed(2)}</strong> / month</div>`);
      }
      case "pipeline": return pipelineBlock(b.title);
      default: return "";
    }
  }

  const card = (title, body) => `<section class="card">${title ? `<h3>${esc(title)}</h3>` : ""}${body}</section>`;

  function checklist(id, title, items) {
    const fixed = items.map((t, i) => {
      const k = id + ":" + i;
      return `<label class="check ${state.checks[k] ? "done" : ""}"><input type="checkbox" data-check="${k}" ${state.checks[k] ? "checked" : ""}><span>${esc(t)}</span></label>`;
    }).join("");
    const custom = (state.custom[id] || []).map((t, i) =>
      `<label class="check ${t.done ? "done" : ""}"><input type="checkbox" data-custom="${id}" data-i="${i}" ${t.done ? "checked" : ""}><span>${esc(t.text)}</span><button class="x" data-del-custom="${id}" data-i="${i}" title="Remove">×</button></label>`).join("");
    const doneCount = items.filter((_, i) => state.checks[id + ":" + i]).length + (state.custom[id] || []).filter((t) => t.done).length;
    const total = items.length + (state.custom[id] || []).length;
    return `<section class="card"><h3>${esc(title || "Checklist")}<span class="count">${doneCount}/${total}</span></h3><div class="checks">${fixed}${custom}</div>
      <form class="add-row" data-add-custom="${id}"><input placeholder="Add a task…" name="t"><button>Add</button></form></section>`;
  }

  function notesBlock(id) {
    return card("Notes", `<textarea class="notes" data-notes="${id}" placeholder="Ideas, decisions, links…">${esc(state.notes[id] || "")}</textarea>`);
  }

  function editableTable(key, title, cols, footer = "") {
    const rows = state[key].map((r, i) => `<tr>${cols.map(([f, , type]) => `<td><input type="${type}" value="${esc(r[f])}" data-table="${key}" data-i="${i}" data-f="${f}"></td>`).join("")}<td class="act"><button class="x" data-del-row="${key}" data-i="${i}">×</button></td></tr>`).join("");
    return card(title, `<div class="table-wrap"><table class="edit"><thead><tr>${cols.map(([, h]) => `<th>${esc(h)}</th>`).join("")}<th></th></tr></thead><tbody>${rows || `<tr><td colspan="${cols.length + 1}" class="empty">No entries yet</td></tr>`}</tbody></table></div><button class="btn" data-add-row="${key}">+ Add row</button>${footer}`);
  }

  const STAGES = ["Lead", "Contacted", "Meeting", "Proposal sent", "Won", "Lost"];
  function pipelineBlock(title) {
    const opts = (arr, v) => arr.map((o) => `<option ${o === v ? "selected" : ""}>${esc(o)}</option>`).join("");
    const projNames = ["—", ...P.projects.map((p) => p.title)];
    const rows = state.pipeline.map((r, i) => `<tr>
      <td><input value="${esc(r.company)}" data-table="pipeline" data-i="${i}" data-f="company" placeholder="Company"></td>
      <td><input value="${esc(r.contact)}" data-table="pipeline" data-i="${i}" data-f="contact" placeholder="Contact"></td>
      <td><select data-table="pipeline" data-i="${i}" data-f="project">${opts(projNames, r.project)}</select></td>
      <td><select data-table="pipeline" data-i="${i}" data-f="stage" class="stage s-${STAGES.indexOf(r.stage)}">${opts(STAGES, r.stage)}</select></td>
      <td><input type="number" value="${esc(r.value)}" data-table="pipeline" data-i="${i}" data-f="value" placeholder="€"></td>
      <td><input value="${esc(r.notes)}" data-table="pipeline" data-i="${i}" data-f="notes" placeholder="Notes"></td>
      <td class="act"><button class="x" data-del-row="pipeline" data-i="${i}">×</button></td></tr>`).join("");
    return card(title, `<div class="table-wrap"><table class="edit"><thead><tr><th>Company</th><th>Contact</th><th>Project type</th><th>Stage</th><th>Value €</th><th>Notes</th><th></th></tr></thead><tbody>${rows || `<tr><td colspan="7" class="empty">No leads yet — add your first one</td></tr>`}</tbody></table></div><button class="btn" data-add-row="pipeline">+ Add lead</button>`);
  }

  function renderProject(p, tab) {
    const st = state.status[p.id] || P.statuses[0];
    const statusSel = `<div class="status-row">Status: <select data-status="${p.id}" class="status st-${P.statuses.indexOf(st)}">${P.statuses.map((s) => `<option ${s === st ? "selected" : ""}>${s}</option>`).join("")}</select></div>`;
    const tabs = [["overview", "Overview"]];
    if (p.examples) tabs.push(["examples", "Example projects"]);
    if (p.resources) tabs.push(["learn", "Learning resources"]);
    if (!tabs.some(([k]) => k === tab)) tab = "overview";
    const tabBar = tabs.length > 1 ? `<nav class="tabs">${tabs.map(([k, label]) => `<a href="#project-${p.id}${k === "overview" ? "" : "/" + k}" class="${k === tab ? "active" : ""}">${label}</a>`).join("")}</nav>` : "";
    const body = tab === "examples" ? renderExamples(p) : tab === "learn" ? renderResources(p) : renderProjectOverview(p);
    return header(p, statusSel) + tabBar + body;
  }

  function renderExamples(p) {
    const ul = (items) => `<ul class="list">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    const lifecycle = p.lifecycle ? card("How a client project runs", `<div class="steps">${p.lifecycle.map((s) => `<div class="step"><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></div>`).join("")}</div>`) : "";
    const examples = p.examples.map((ex, n) => `
      <section class="card example">
        <div class="ex-num">Example ${n + 1}</div>
        <h3>${esc(ex.title)}</h3>
        <p class="ex-client">${esc(ex.client)}</p>
        <div class="ex-grid">
          <div><h4>Problem</h4><p>${esc(ex.problem)}</p></div>
          <div><h4>Solution</h4><p>${esc(ex.solution)}</p></div>
        </div>
        <h4>How it works</h4><ol class="list">${ex.how.map((i) => `<li>${esc(i)}</li>`).join("")}</ol>
        <h4>Tech</h4><div class="tags">${ex.stack.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
        <div class="ex-grid">
          <div><h4>Deliverables</h4>${ul(ex.deliverables)}</div>
          <div><h4>Timeline</h4><p>${esc(ex.timeline)}</p><h4>Price</h4><p>${esc(ex.price)}</p></div>
        </div>
        <div class="callout warn"><strong>Risks & how to handle them</strong>${ul(ex.risks)}</div>
      </section>`).join("");
    return `<div class="blocks">${lifecycle}${examples}</div>`;
  }

  function renderResources(p) {
    const keyOf = (g, i) => `res-${p.id}:${g}:${i}`;
    let total = 0, done = 0;
    p.resources.forEach((g, gi) => g.items.forEach((_, i) => { total++; if (state.checks[keyOf(gi, i)]) done++; }));
    const pct = total ? Math.round((done / total) * 100) : 0;
    const groups = p.resources.map((g, gi) => card(g.group, `<div class="res-list">${g.items.map((r, i) => {
      const k = keyOf(gi, i);
      return `<div class="res ${state.checks[k] ? "done" : ""}"><input type="checkbox" data-check="${k}" ${state.checks[k] ? "checked" : ""} title="Mark as completed"><div><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)} ↗</a><p>${esc(r.desc)}</p></div></div>`;
    }).join("")}</div>`)).join("");
    return `<div class="blocks"><div class="callout info"><strong>Learning progress: ${done}/${total} (${pct}%)</strong><p>Tick a resource once someone on the team has worked through it. Tip: split them up — one person learns automation, another chatbots/RAG, another web dev — then teach each other.</p></div>${groups}${notesBlock("learn-" + p.id)}</div>`;
  }

  function renderProjectOverview(p) {
    const leads = state.pipeline.filter((r) => r.project === p.title);
    return `<div class="blocks">
      <div class="grid">
        <div class="mini-card"><h4>Problem</h4><p>${esc(p.problem)}</p></div>
        <div class="mini-card"><h4>Solution</h4><p>${esc(p.solution)}</p></div>
        <div class="mini-card"><h4>Target customers</h4><p>${esc(p.customers)}</p></div>
        <div class="mini-card"><h4>Hardware cost</h4><p>${esc(p.hardware)}</p></div>
        <div class="mini-card"><h4>Pricing idea</h4><p>${esc(p.pricing)}</p></div>
        <div class="mini-card"><h4>Leads in pipeline</h4><p>${leads.length ? leads.map((l) => esc(l.company || "Unnamed") + " · " + esc(l.stage)).join("<br>") : "None yet — add in <a href='#gtm'>Sales & Clients</a>"}</p></div>
      </div>
      ${card("Tech stack", `<div class="tags">${p.stack.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>`)}
      ${checklist("mvp-" + p.id, "MVP / demo steps", p.mvp)}
      ${notesBlock("project-" + p.id)}
    </div>`;
  }

  function renderDashboard() {
    const all = Object.values(pages).filter((p) => p.kind !== "dashboard");
    let t = 0, d = 0;
    all.forEach((p) => { const pr = progress(p); t += pr.total; d += pr.done; });
    const overall = t ? Math.round((d / t) * 100) : 0;
    const won = state.pipeline.filter((r) => r.stage === "Won");
    const open = state.pipeline.filter((r) => !["Won", "Lost"].includes(r.stage));
    const revenue = won.reduce((s, r) => s + (parseFloat(r.value) || 0), 0);
    const burn = state.budget.reduce((s, r) => s + (parseFloat(r.cost) || 0), 0);
    const p30 = progress(pages.plan30);

    const stat = (label, value, sub = "") => `<div class="stat"><div class="stat-label">${label}</div><div class="stat-value">${value}</div>${sub ? `<div class="stat-sub">${sub}</div>` : ""}</div>`;

    const sectionRows = P.groups.flatMap((g) => g.pages).filter((p) => p.kind !== "dashboard").map((p) => {
      const pr = progress(pages[p.id]);
      return `<a class="prog-row" href="#${p.id}"><span>${p.icon} ${esc(p.title)}</span><div class="bar"><div style="width:${pr.pct}%"></div></div><span class="pct">${pr.pct}%</span></a>`;
    }).join("");

    const projCards = P.projects.map((p) => {
      const pr = progress(pages["project-" + p.id]);
      const st = state.status[p.id] || P.statuses[0];
      return `<a class="proj-card" href="#project-${p.id}"><div class="proj-top"><span class="proj-icon">${p.icon}</span><span class="pill st-${P.statuses.indexOf(st)}">${st}</span></div><h4>${esc(p.title)}</h4><p>${esc(p.tagline)}</p><div class="bar"><div style="width:${pr.pct}%"></div></div><div class="stat-sub">${pr.done}/${pr.total} MVP steps</div></a>`;
    }).join("");

    return `<header class="page-head"><div class="crumb">Overview</div><h1>${esc(P.name)}</h1><p class="intro">${esc(P.tagline)}</p></header>
      <div class="stats">
        ${stat("Overall progress", overall + "%", `${d}/${t} tasks`)}
        ${stat("First 30 days", p30.pct + "%", `${p30.done}/${p30.total} tasks`)}
        ${stat("Open leads", open.length, `${won.length} won`)}
        ${stat("Won revenue", "€" + revenue.toFixed(0), `Costs €${burn.toFixed(0)}/mo`)}
      </div>
      <section class="card"><h3>Projects</h3><div class="proj-grid">${projCards}</div></section>
      <section class="card"><h3>Business sections</h3><div class="prog-list">${sectionRows}</div></section>`;
  }

  // ---------- Events ----------
  const paint = () => { renderNav(); const y = $("#main").scrollTop; route(); $("#main").scrollTop = y; };
  // Save the given keys, then redraw.
  const rerender = (...keys) => { save(keys); paint(); };

  // Remote changes from teammates: redraw, but not while someone is typing (it would steal focus).
  let deferred = false;
  const isEditing = () => { const a = document.activeElement; return a && (a.tagName === "TEXTAREA" || (a.tagName === "INPUT" && a.type !== "checkbox")); };
  const onRemote = () => { if (isEditing()) { deferred = true; renderNav(); } else paint(); };
  document.addEventListener("focusout", () => setTimeout(() => { if (deferred && !isEditing()) { deferred = false; paint(); } }, 50));

  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset.check) { state.checks[t.dataset.check] = t.checked; rerender("check:" + t.dataset.check); }
    else if (t.dataset.custom) { state.custom[t.dataset.custom][t.dataset.i].done = t.checked; rerender("custom:" + t.dataset.custom); }
    else if (t.dataset.status) { state.status[t.dataset.status] = t.value; rerender("status:" + t.dataset.status); }
    else if (t.dataset.table && t.tagName === "SELECT") { state[t.dataset.table][t.dataset.i][t.dataset.f] = t.value; rerender("table:" + t.dataset.table); }
  });
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.dataset.notes !== undefined) { state.notes[t.dataset.notes] = t.value; save(["notes:" + t.dataset.notes], 600); }
    else if (t.dataset.table && t.tagName === "INPUT") {
      state[t.dataset.table][t.dataset.i][t.dataset.f] = t.value; save(["table:" + t.dataset.table], 600);
      if (t.dataset.table === "budget") {
        const total = state.budget.reduce((s, r) => s + (parseFloat(r.cost) || 0), 0);
        const el = $(".total strong"); if (el) el.textContent = "€" + total.toFixed(2);
      }
    }
  });
  document.addEventListener("submit", (e) => {
    const f = e.target;
    if (f.dataset.addCustom) {
      e.preventDefault();
      const v = f.t.value.trim(); if (!v) return;
      (state.custom[f.dataset.addCustom] = state.custom[f.dataset.addCustom] || []).push({ text: v, done: false });
      rerender("custom:" + f.dataset.addCustom);
    }
  });
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;
    if (t.dataset.delCustom) { e.preventDefault(); state.custom[t.dataset.delCustom].splice(t.dataset.i, 1); rerender("custom:" + t.dataset.delCustom); }
    else if (t.dataset.addRow) {
      const k = t.dataset.addRow;
      state[k].push(k === "pipeline" ? { company: "", contact: "", project: "—", stage: "Lead", value: "", notes: "" } : {});
      rerender("table:" + k);
    } else if (t.dataset.delRow) {
      if (confirm("Delete this row?")) { state[t.dataset.delRow].splice(t.dataset.i, 1); rerender("table:" + t.dataset.delRow); }
    }
  });

  // Export / import / reset
  $("#export").onclick = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `startup-hq-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };
  $("#import").onclick = () => $("#import-file").click();
  $("#import-file").onchange = (e) => {
    const file = e.target.files[0]; if (!file) return;
    file.text().then(async (txt) => {
      let parsed;
      try { parsed = Object.assign(defaultState(), JSON.parse(txt)); } catch { alert("That file is not a valid export."); return; }
      if (Store.cloud && !confirm("This replaces the progress for the WHOLE team. Continue?")) return;
      state = await Store.replaceAll(parsed); paint(); alert("Progress imported.");
    });
    e.target.value = "";
  };
  $("#reset").onclick = async () => {
    const msg = Store.cloud ? "Reset ALL progress, notes and tables for the WHOLE team? Export first if unsure." : "Reset ALL progress, notes and tables? Export first if unsure.";
    if (confirm(msg)) { state = await Store.replaceAll(defaultState()); paint(); }
  };
  $("#menu").onclick = () => document.body.classList.toggle("nav-open");

  // ---------- Boot ----------
  $("#main").innerHTML = `<div class="loading">Loading…</div>`;
  try {
    state = await Store.init(defaultState, onRemote);
  } catch (err) {
    $("#main").innerHTML = `<div class="callout warn"><strong>Could not load the workspace</strong><p>${esc(err.message || err)}</p></div>`;
    return;
  }
  if (Store.cloud) {
    $("#account").innerHTML = `<div id="sync">Synced · ${esc(Store.email)}</div><button id="signout">Sign out</button>`;
    $("#signout").onclick = () => Store.signOut();
  } else {
    $("#account").innerHTML = `<div id="sync">Local mode · saved in this browser</div>`;
  }
  window.addEventListener("hashchange", route);
  renderNav();
  route();
})();

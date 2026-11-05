# Startup HQ

Planning platform for our AI engineering startup: strategy, legal and tax (NL), tools, sales pipeline, and the project types with example projects and learning resources.

It's a plain HTML/CSS/JS site with no build step, hosted on GitHub Pages. Shared team progress is stored in Supabase (free tier).

## Files
| File | What it is |
|---|---|
| `index.html` | Page shell |
| `data.js` | **All content.** Edit this to change sections, checklists, projects and resources |
| `app.js` | Rendering and interactions |
| `store.js` | Saving: Supabase (shared) or browser localStorage (local mode) |
| `config.js` | Supabase URL and anon key. Leave them empty for local mode |
| `supabase-setup.sql` | Database setup script |

## Setting up the shared workspace (one time)
1. Create a free account at https://supabase.com and create a new project. Pick an EU region, such as Frankfurt.
2. **SQL Editor → New query**: paste `supabase-setup.sql`, **replace the example emails with the team's real emails**, and click Run.
3. **Authentication → Sign In / Providers**: turn **off** "Allow new users to sign up".
4. **Authentication → Users → Add user → Create new user**: create an account for each teammate (email, password, tick "Auto Confirm User"). Then send each person their password privately.
5. **Project Settings → API**: copy the **Project URL** and the **anon / public key** into `config.js`, then commit.

The anon key is meant to be public. Data is protected by the login plus row-level security that only allows emails listed in `team_members`.

## Adding a teammate later
1. SQL Editor: `insert into public.team_members (email) values ('name@example.com');`
2. Authentication → Users → Add user.

## Running locally
Open `index.html` in a browser. It uses the shared workspace if `config.js` is filled in, and local mode otherwise.

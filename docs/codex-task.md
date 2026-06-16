# Codex task · Shejire 2.0

Build a mobile-first Nuxt 3 MVP. Important: use Nuxt 3, not Next.js.

Project: Shejire 2.0 helps users keep in touch with relatives.

Routes:

* `/` — home screen
* `/relatives` — relatives list
* `/relatives/new` — quick add relative
* `/import` — smart import

Features:

1. Home screen shows relatives who need contact.
2. Add relative with only name and relation. Default reminder interval: 14 days.
3. Relatives list shows name, relation, last contact date.
4. Simulated AI draft using templates, no real AI API.
5. “Я связался ✅” updates last_contact_at and creates interaction.
6. Smart Import screen:

   * text input works in v1;
   * screenshot and voice are placeholders only.

Data models:

* users: id, tg_id, name, created_at
* relatives: id, user_id, name, relation, reminder_interval_days, last_contact_at, created_at
* reminders: id, relative_id, remind_at, status, created_at
* interactions: id, relative_id, interaction_type, interaction_at, note, created_at

UX:

* mobile-first
* Russian UI
* simple app-like design
* loading, empty, error states
* use mock/local data first
* no Supabase connection yet
* no real Telegram integration yet

Out of scope:

* real AI API
* real OCR
* real speech-to-text
* contacts sync
* calendar sync
* payments
* auth
* full family tree

Workflow:

1. Inspect current project.
2. Explain what you found.
3. Make a short plan.
4. Do not change files until I approve.

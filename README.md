# Runspeed AI Web

## Overview

Runspeed AI Web is a UI-only scaffold for the Runspeed AI web experience. The Next.js app in
`web-app/` contains the navigation shell, layout, and polished placeholder states for core flows
such as Create, Filters, Models, and Gallery.

## Local development

```bash
cd web-app
npm install
npm run dev
```

## Handoff notes (next wiring steps)

### 1. Data + auth
- Connect Supabase Auth and session hydration in the AppShell so the header and profile routes can
  render user data.
- Wire `/profile`, `/gallery`, and `/create` to user-specific queries using the planned tables in
  `WEB_VERSION_PLAN.md`.

### 2. Credits + payments
- Add a credits store (React Query + Zustand, or equivalent) and connect it to `user_credits`.
- Implement Stripe checkout for credit purchases and persist transactions in
  `credit_transactions`.

### 3. Generation flows
- Replace the mock generation state machine in `src/app/create/page.tsx` with real API calls.
- Use the upload dropzone + preview components in `src/components/create/` to send assets to
  Supabase Storage, then pass signed URLs to model endpoints.
- Subscribe to `pending_jobs` realtime updates to drive progress states.

### 4. Gallery
- Swap the stubbed media arrays in `src/app/gallery/page.tsx` with actual `user_media` queries.
- Hook the viewer shell actions (download, favorite, share) to storage + metadata updates.

### 5. Filters + models
- Drive the filters and models pages from the API catalog tables or static JSON lists for now.
- Connect filter selections to the Create page as presets (prompt + model + aspect ratio).

### 6. Webhooks + edge functions
- Add webhook routes or Supabase Edge Functions for Runware/WaveSpeed/Fal.ai callbacks.
- On completion, download results to `user-media`, update `user_media`, and deduct credits.

## UI polish summary

Recent polish pass includes updated empty states, microinteractions, and additional UI guidance for
handoff. See `CODEX_PROGRESS.md` for task tracking.

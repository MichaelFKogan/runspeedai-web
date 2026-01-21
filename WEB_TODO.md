# Runspeed AI – Web UI TODO

Source of truth: `WEB_VERSION_PLAN.md`. Scope is UI-only (no auth, no backend, no API wiring).

## Phase 1 – Foundation & Scaffolding
- [ ] Confirm frontend stack (Next.js 14 App Router + TypeScript + Tailwind + shadcn/ui) per plan.
- [ ] Scaffold web project (repo root or `web-app/`), align folders to recommended structure.
- [ ] Add global theming (light/dark, brand tokens, typography, spacing scale).
- [ ] Establish navigation shell (top nav, optional desktop sidebar, mobile hamburger).
- [ ] Set up routing placeholders for main areas (home, filters, models, camera/post, gallery, profile).
- [ ] Add baseline page chrome: header, footer, breadcrumbs support.

## Phase 2 – Reusable UI Components
- [ ] Build UI kit primitives (buttons, inputs, textareas, selects, switches, badges, tags).
- [ ] Create media surface components (cards, tiles, list items, skeleton/loading states).
- [ ] Build upload/drag-drop component with preview (UI only; mock callbacks).
- [ ] Create progress indicators (spinners, progress bars, status chips) for generation flows.
- [ ] Build modal/sheet, drawer, tooltip, toast/toaster patterns.
- [ ] Define layout utilities (grids, responsive columns, gutters).

## Phase 3 – Global Layout & Navigation UX
- [ ] Implement responsive navigation patterns (topbar + mobile menu; optional desktop sidebar).
- [ ] Add route-level breadcrumbs for deep pages.
- [ ] Add quick-access actions (e.g., "New upload", "Try filter") in nav shell.
- [ ] Ensure active state, hover, focus, and keyboard navigation across nav elements.

## Phase 4 – Page Shells (UI-Only, Stub Data)
- [ ] Home: hero, featured models/filters carousel, quick links.
- [ ] Photo Filters: category grid/list, filter detail preview, CTA to apply (stub actions).
- [ ] Camera/Post Upload: upload dropzone, preview pane, basic prompt/controls stubs.
- [ ] AI Models (image/video): model directory with facets (type, aspect, duration/resolution tags).
- [ ] Gallery/Profile: responsive media grid, filter/sort controls, lightbox/viewer shell, profile summary card.

## Phase 5 – Generation UX Surfaces (Mocked)
- [ ] Design generation request form shell (fields for prompt, aspect ratio, style/model selector).
- [ ] Add progress/tracking UI states (queued, running, succeeded, failed) with mocked data.
- [ ] Add result display panels (image/video preview, download/share buttons) using placeholder assets.
- [ ] Add empty/error/edge states for uploads, filters, and gallery.

## Phase 6 – Responsive Pass
- [ ] Define breakpoints and responsive rules for nav, grids, and cards.
- [ ] Validate layouts for mobile, tablet, desktop (e.g., 360px, 768px, 1280px).
- [ ] Optimize touch targets and spacing for mobile.
- [ ] Ensure media grids reflow gracefully with masonry or CSS grid auto-fit.

## Phase 7 – Accessibility Sweep
- [ ] Ensure semantic structure (landmarks, headings, lists, buttons vs. links).
- [ ] Add ARIA labels/roles for nav, menus, dialogs, upload zones, progress.
- [ ] Keyboard support: focus order, skip links, trap in dialogs/menus, ESC to close.
- [ ] Color contrast audit and focus-visible styles.
- [ ] Screen reader copy for statuses (upload/progress/results) and error messaging.

## Phase 8 – Visual Polish
- [ ] Apply brand styling to buttons, cards, chips, nav, and hero.
- [ ] Tune microinteractions (hover, pressed, loading, disabled states).
- [ ] Refine typography scale, line lengths, and spacing rhythm.
- [ ] Add illustration/placeholder set for empty states.
- [ ] Light/dark theme refinement (backgrounds, surfaces, elevation, borders).

## Phase 9 – UI QA & Hand-off Prep
- [ ] Run visual pass across pages with mocked data; capture reference screenshots.
- [ ] Document component usage guidelines and tokens (in repo README or design notes).
- [ ] Prepare checklist for connecting API/auth later (marked out-of-scope for this pass).

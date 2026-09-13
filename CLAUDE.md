# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

CareSync (package name `care-sync`, formerly "SanctumCare") is a trauma-informed, zero-knowledge crisis support and wellbeing check-in platform. It presents three role-based experiences in one client-rendered SPA: a survivor-facing guided check-in flow with a safety quick-exit, a counselor portal for clinical triage/alerts, and a district admin portal for anonymized regional oversight.

The app is mostly a frontend prototype — all data (cases, alerts, reflections) comes from `src/data/mockData.ts` — but the AI companion chat in the guided check-in flow (`src/pages/GuidedCheckInPage.tsx`) does make a real call to the Gemini API via `@google/genai`. The API key never reaches the client: `vite.config.ts` registers a dev/preview-only server middleware (`geminiChatApiPlugin`) that exposes `POST /api/chat`, backed by `src/server/geminiChat.ts`, which reads `GEMINI_API_KEY` from `process.env` (loaded from `.env.local` via `loadEnv` in `vite.config.ts`) and calls `ai.models.generateContent`. If the key is missing or the request fails, `sendText` in `GuidedCheckInPage.tsx` catches the error and falls back to the original scripted canned replies, so the check-in flow still works without a key configured. `src/server/geminiChat.ts` also short-circuits with a fixed, translated crisis-resources reply (`checkin.botReplyCrisis`) whenever the user's latest message matches a small set of self-harm/suicide regex patterns — this bypasses the model entirely and does not depend on the API key being set.

## Commands

- `npm run dev` — start Vite dev server on port 3000 (bound to `0.0.0.0`)
- `npm run build` — production build via `vite build`
- `npm run preview` — preview the production build
- `npm run lint` — type-check only (`tsc --noEmit`); there is no separate lint tool configured
- `npm run clean` — removes `dist/` and `server.js`

There is no test runner configured in this repo (no test script, no test files).

## Architecture

**Single-page, state-driven routing (no router library).** `src/App.tsx` holds `currentPage: PageId` state and conditionally renders one page component per value — there is no `react-router` or URL-based navigation. Page components receive an `onNavigate(page: PageId)` callback as a prop to change routes, and `PageId` (in `src/types.ts`) is the single source of truth for valid routes. When adding a page: add the `PageId` variant, create the component under `src/pages/`, wire it into the conditional block in `App.tsx`, and add navigation entries in `Header.tsx`/`Footer.tsx`.

**Modals are lifted to `App.tsx`, not owned by pages.** `GroundingModal`, `CounselorModal`, `ReflectionModal`, and `QuickExitOverlay` are all rendered at the `App` level with their open/close state (and, for `ReflectionModal`, the selected item) held in `App.tsx` and passed down as `onOpen*` callbacks to whichever page needs to trigger them. This lets e.g. the counselor-relay modal or grounding exercise be triggered from multiple unrelated pages.

**Safety quick-exit is a global keyboard listener.** `App.tsx` attaches a window-level `keydown` listener for `Escape` that opens `QuickExitOverlay`, which on confirm clears `sessionStorage`/`localStorage`. This is a core trauma-informed UX requirement — any new page with sensitive content should not intercept/prevent the `Escape` key.

**Role state exists but isn't used for access control.** `userRole: UserRole` (`'guest' | 'survivor' | 'counselor' | 'admin'`) is set on login but nothing in `App.tsx` currently gates page rendering by role — survivor, counselor, and admin pages are all reachable via navigation regardless of `userRole`. Don't assume role-based guarding exists; it would need to be added.

**Mock data typing.** `src/types.ts` defines the shared domain types (`CaseRecord`, `AlertItem`, `CheckInReflection`, `ChatMessage`, `MoodType`, `PageId`, `UserRole`). `src/data/mockData.ts` implements `MOCK_CASES`, `MOCK_ALERTS`, `MOCK_REFLECTIONS` against those types plus an `ASSETS` map of hosted image URLs. Pages import directly from `mockData.ts`; there is no data-fetching layer, context provider, or state management library — each page manages its own local `useState`.

**Styling: Tailwind v4 with a custom Material-3-style theme, no config file.** Tailwind v4 is wired in via the `@tailwindcss/vite` plugin (see `vite.config.ts`), and the theme is defined entirely in `src/index.css` via `@theme` CSS variables (`--color-primary`, `--color-surface*`, `--font-sans`, `--font-headline`, etc.) — there is no `tailwind.config.js`. Fonts are Plus Jakarta Sans (body) and Space Grotesk (headline/display); icons use Material Symbols via the `.material-symbols-outlined`/`.material-symbols-filled` classes.

**Path alias.** `@/*` resolves to the repo root (not `src/`) in both `tsconfig.json` and `vite.config.ts`.

**3D hero canvas.** `src/pages/HomePage.tsx` renders `src/components/CareSync3DCanvas.tsx` for the landing page's holographic hero visual. Note: `src/components/Sanctum3DCanvas.tsx` is an untracked, unused duplicate of the same component left over from the SanctumCare→CareSync rename — only `CareSync3DCanvas.tsx` is imported anywhere.

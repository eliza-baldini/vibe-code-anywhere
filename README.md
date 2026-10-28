# Vibe Code Anywhere. Governed Everywhere.

A click-through web version of the *Vibe Code Anywhere, Governed Everywhere – External Video Deck (Draft)* Google Slides deck: 15 slides on a 16:9 canvas that scales to any screen, in the deck's own Tableau corporate style.

```bash
npm install
npm run dev
```

## Presenting

- → / Space / swipe: next slide. Each slide's builds play automatically.
- ← : previous slide · Home / End: first / last · O: overview of all slides · Esc: close the overview.
- Every slide has its own link, e.g. `#layers-vibe`.
- Slides 3–4 and 5–6 share one canvas: the dashboards and the 18-layer grid stay in place and change.

## Editing

- **Text:** `src/content/` holds all copy, copied verbatim from the deck (one file per section).
- **Slides:** `src/slides/`; the order, sections and build timing are in `src/deck/slides.tsx`.
- **Speed:** `MOTION_SCALE` in `src/deck/Build.tsx` (animation length) and `PACE_SCALE` in `src/deck/slides.tsx` (pauses between builds). Both are 1.25: 25% slower than the default.
- **Images:** `public/` holds screenshots, logos and brand art downloaded from the deck. The Data Apps and Knowledge screens are the deck's animated GIFs (about 11–12 MB each).

Fonts are free stand-ins for the licensed Salesforce fonts: Plus Jakarta Sans for Avant Garde Demi SFDC, and Inter for Salesforce Sans.

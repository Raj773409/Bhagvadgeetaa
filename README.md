# Bhagavad Gita Vishwa Mahotsav 2027

Phase 01 is a self-contained React, TypeScript and Tailwind CSS welcome page. Vite serves it on port 3000 for local development and preview environments. The repository began as an empty workspace.

## Run and verify

Use Node 22.12 or newer and npm.

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm test
```

The test suite starts its own local server for the production build. It uses an installed Google Chrome, or a Chromium executable supplied through `CHROME_PATH`. Set `QA_SCREENSHOTS` to an output directory to retain mobile and desktop captures.

## Structure

- `src/content.ts` holds typed English, Hindi and Telugu copy, dates and source destinations.
- `src/components/` contains the navigation, hero, content sections, footer, ornaments, buttons and motion primitive.
- `src/styles.css` defines design tokens, responsive layouts, focus states and motion preferences.
- `public/images/` holds the optimized event emblem, art-directed hero images and scripture still life. All fonts and page imagery are served locally.
- `tests/welcome.mjs` checks navigation, local anchors, language persistence, image loading, overflow and runtime errors at the six design widths. It also runs axe WCAG A/AA checks on desktop and mobile.

## Editorial sources

The [official event homepage](https://bhagavadgitavishwamahotsav.com/) supplies the event name, dates, eighteen-part vision and emblem. The local emblem is optimized from the organizer’s [bh4.png](https://bhagavadgitavishwamahotsav.com/bh4.png). The 50,000+ figure is presented as a participation target.

The [Curtain Raiser](https://bhagavadgitavishwamahotsav.com/programme/curtain-raiser) and [Mahotsav programme](https://bhagavadgitavishwamahotsav.com/programme/mega-mahotsav) supply the milestone dates. Venue updates and [registration](https://bhagavadgitavishwamahotsav.com/participate/register) link to the organizer. The homepage’s Hyderabad address is its contact address.

The temple pavilion and scripture still life are original AI-generated editorial illustrations. The hero depicts an imagined setting. The printed marks in the still life are decorative. The readable verse and attributed English excerpt are drawn from [Bhagavad Gita 2.47 at IIT Kanpur](https://heritage.iitk.ac.in/SBG/2.47). Hindi and Telugu renderings are editorial.

## Later phases

Proposed architecture, subject to the future briefs.

| Phase | Scope |
| --- | --- |
| 02 | Expand the locale-keyed content model into chapter, country and language records backed by a CMS. |
| 03 | Introduce server-side registration, participant identity and authenticated dashboard routes. |
| 04 | Integrate provider-hosted payments, server-verified notifications and receipts. |
| 05 | Add a separately authorized administration area with editorial roles and audit history. |

# VARA Systems — corporate site

Thai-first marketing site for a business-systems studio: workflow design,
internal tools, dashboards, integrations and (sparingly) AI automation.

Built with Next.js App Router, TypeScript and Tailwind CSS v4. Icons are
`lucide-react`; there is no animation library — the motion is CSS transitions
plus one `IntersectionObserver`.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
```

## Structure

```
src/
  app/                 routes, metadata, sitemap/robots, OG image, API route
    api/consultation/  form endpoint + delivery adapter
  components/
    layout/            Header, MobileNav, Footer, LanguageSwitcher
    sections/          one file per page section, plus SiteHome
    site/              page-specific blocks (diagrams, cards, form, accordion)
    ui/                Container, Section, SectionHeader/Heading, Button, …
  config/site.ts       company name, contact details, address
  content/             locale dictionaries (all copy lives here)
  lib/                 i18n config, consultation contract + validation, utils
scripts/               optional visual/accessibility QA harness
```

Page-specific copy never lives inside a component: sections read from the
dictionary passed down from `SiteHome`.

## Adding English

The architecture is already locale-driven:

1. Copy `src/content/th.ts` to `src/content/en.ts` and translate it. The
   `Dictionary` type widens the Thai literals, so the English file only has to
   match the shape.
2. Register it in `src/content/index.ts` (`const dictionaries = { th, en }`).
3. Add `"en"` to `availableLocales` in `src/lib/i18n.ts` — the header/footer
   language selector stops marking it unavailable automatically.
4. Add a route that renders the shared page with the other locale:

   ```tsx
   // src/app/en/page.tsx
   export default function EnglishHomePage() {
     return <SiteHome locale="en" />;
   }
   ```

Headline arrays are authored as one line per intended desktop break. Lines run
together inline below `md`, so a line that needs a space when it follows the
previous one carries a leading space in the dictionary.

## Consultation form

`src/lib/consultation.ts` holds the payload type, the validation rules and the
single `submitConsultation()` call site. It posts to `POST /api/consultation`,
which revalidates server-side and then hands the submission to the delivery
adapter in that route:

- **No env configured** — the submission is logged and the route answers
  `{ ok: true, delivered: false }`. Nothing is sent anywhere.
- **`CONSULTATION_WEBHOOK_URL` set** — the payload is forwarded as JSON, with an
  optional `CONSULTATION_WEBHOOK_TOKEN` bearer header.

Copy `.env.example` to `.env.local` to wire a backend. To use a CRM SDK instead,
replace the `deliver()` function; nothing else has to change.

## Design notes

- Palette, type scale and spacing are tokens in `src/app/globals.css`
  (`@theme`). Accent navy is reserved for primary CTAs and small marks.
- Type is IBM Plex Sans Thai with IBM Plex Mono for labels and numerals, both
  self-hosted through `next/font`. Thai headlines use a ~1.16 line-height —
  tighter clips the tone marks — and Thai text is never uppercased or
  letterspaced.
- Section rhythm comes from `Section` (`tight` / `default` / `loose`) and
  hairline dividers rather than shadows.
- Motion: 150–350 ms transitions, a single scroll reveal that is disabled under
  `prefers-reduced-motion`, and content that stays visible when JS is off.

## QA harness (optional)

The scripts in `scripts/` drive an installed Chrome through `playwright-core`
and are not part of the app's dependencies:

```bash
npm install --no-save playwright-core axe-core
npm run start &                     # or: npx next start -p 3210
node scripts/shoot.mjs http://localhost:3210        # overflow check, 375→1920
node scripts/sections.mjs 1440 http://localhost:3210 # per-section screenshots
node scripts/interactions.mjs                        # nav, accordion, form flows
node scripts/a11y.mjs                                # axe-core audit
```

Set `CHROME_PATH` if Chrome is not at the default Windows location.

## Before launch

Replace the placeholder company details in `src/config/site.ts` (name, address,
phone, email, LINE, canonical URL) and have `src/content/legal.ts` reviewed.

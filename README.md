# Modus Construct — Website

Production website for **Modus Construct SRL**, a modular construction company based in Chișinău, Republic of Moldova. Two product lines: modular steel frames and turnkey containers.

Domain: **modus.md**

## Stack

- **Next.js 15** (App Router, React 18) + **TypeScript** strict
- **Tailwind CSS** (utility-first, no custom CSS outside globals)
- **Framer Motion** for refined motion (parallax, scroll reveal, count-up, page transitions)
- **React Three Fiber + drei** for the interactive container 3D configurator
- **Nodemailer** for server-side quote-form delivery (SMTP)
- **Custom i18n** for `ro-MD` + `ru-MD` with cookie + `Accept-Language` detection
- **Vercel** ready — no platform-specific config needed

## Structure

```
app/
  [locale]/
    page.tsx              # Home
    carcase/page.tsx      # Modular frames
    containere/page.tsx   # Turnkey containers
    portofoliu/page.tsx   # Filterable portfolio + lightbox
    proces/page.tsx       # 6-step process
    despre/page.tsx       # About + team + workshop
    oferta/page.tsx       # Multi-step quote form + 3D configurator
    layout.tsx            # Locale layout (LD-JSON, nav, footer, sticky CTAs)
    not-found.tsx
  api/quote/route.ts      # POST handler that emails the lead (nodemailer)
  page.tsx                # Root redirect → /<defaultLocale>
  sitemap.ts              # Dynamic sitemap with hreflang
  robots.ts               # Robots.txt
  layout.tsx              # Global HTML shell
  globals.css             # Tailwind layers + design tokens
components/
  brand/Logo.tsx
  configurator/
    ContainerConfigurator.tsx   # R3F scene, sliders, color/window/door pickers
    ConfiguratorLoader.tsx      # Dynamic-imported, SSR-disabled wrapper
  forms/QuoteForm.tsx           # 4-step form + honeypot + dropzone + calculator
  motion/{CountUp,PageTransition,Parallax,Reveal}.tsx
  navigation/{Footer,LocaleSwitcher,NavBar,StickyCTAs}.tsx
  sections/{
    CtaBanner, DirectionsBlock, Faq, Hero, Lightbox, PageHero,
    PortfolioGrid, ProcessTimeline, ProductCard, SectionHeader,
    StatsBlock, Testimonials
  }.tsx
lib/
  i18n.ts          # Dictionary + helpers (ro + ru, exhaustive copy)
  portfolio.ts     # Portfolio dataset (typed)
  products.ts      # Products dataset (sourced from CONTAINERE.numbers)
  site.ts          # Site metadata, contact, geo
middleware.ts      # Locale detection + redirect
public/
  projects/        # Real images extracted from client's Numbers file
  og/cover.jpg     # Open Graph cover
  logo.svg / favicon.svg
  llms.txt         # AI crawler digest
```

## Local development

```bash
npm install --legacy-peer-deps
cp .env.example .env.local           # fill in SMTP credentials when ready
npm run dev                          # http://localhost:3000
```

The `--legacy-peer-deps` flag is necessary because `@react-three/fiber` 8 still declares a `react@<19` peer range; React 18 is fully compatible.

## Production build

```bash
npm run build
npm run start
```

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (defaults to `https://modus.md`) |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number in international format, no `+` |
| `NEXT_PUBLIC_PHONE`    | Display phone number |
| `CONTACT_EMAIL`        | Inbox that receives quote submissions |
| `SMTP_HOST/PORT/SECURE/USER/PASSWORD` | SMTP transport (Gmail App Password works) |
| `SMTP_FROM`            | Friendly `From` header for outgoing mail |

When `SMTP_HOST` is not configured the API route logs the payload and returns success so the UI flow can be exercised in development.

## Internationalisation

- Locale segments under `app/[locale]/...` for `ro` and `ru`.
- `lib/i18n.ts` holds **all** UI copy — components must never hardcode strings.
- `middleware.ts` detects locale from cookie / `Accept-Language` and redirects.
- Sitemap emits `hreflang` for both languages plus `x-default`.

## SEO & performance

- Per-page `generateMetadata` with unique titles, descriptions, keywords.
- `LocalBusiness`, `BreadcrumbList`, `ItemList`, `FAQPage` JSON-LD.
- Dynamic sitemap & robots, plus `llms.txt` for AI crawlers.
- Open Graph + Twitter cards with a 1200×630 cover.
- All images use `next/image` (AVIF/WebP automatic), with explicit `sizes`.
- Heavy 3D bundle is `dynamic`-imported and excluded from SSR.

## Working with the spreadsheet data

The product catalogue (`lib/products.ts`) and the i18n FAQ / testimonials are seeded from `CONTAINERE.numbers`. When the client updates the file:

1. Re-export the spreadsheet (or open it in Numbers and copy values).
2. Update the corresponding entry in `lib/products.ts` — keep names, dimensions, prices, colours, features and applications in sync per locale.
3. Drop new photos into `public/projects/` and reference them from the product / portfolio definitions.

Any field that is still unknown is marked `// TODO:` so it can be searched easily before launch.

## Deploying to Vercel

1. Push the repo to GitHub (or any Git remote).
2. Import the project in Vercel.
3. Add the environment variables above (production + preview).
4. The default Build Command (`next build`) and Output Directory work as-is.
5. Connect the `modus.md` domain in Vercel → Domains.

## Accessibility & UX guardrails

- Honeypot field `company` blocks naive bot submissions on the quote form.
- Form supports drag-and-drop attachments (max 5 files / 10 MB each).
- Lightbox is keyboard-navigable (arrow keys + Esc).
- Reduced-motion preference disables parallax & float effects via `useReducedMotion`.
- Skip-to-content link, semantic landmarks, focus rings on every interactive element.

## Known TODOs (search the repo for `// TODO:`)

- Replace placeholder founder photos in `app/[locale]/despre/page.tsx`.
- Confirm price for `container-standart-model-3` (left blank in the spreadsheet).
- Swap partner brand names in `lib/i18n.ts` once contracts are signed.
- Verify ISO 9001 certification claim in the same file.

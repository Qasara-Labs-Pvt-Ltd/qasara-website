# Qasara Website

Production-quality Next.js 14 (App Router) website for Qasara — Canton Network infrastructure and product company.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Lucide

## Setup

```bash
npm install
npm run dev
```

Opens at http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Pages

- `/` — Home (hero, products, why Canton, infra & ecosystem, CTA)
- `/cove` — Cove Wallet API product page
- `/bridge` — Canton Bridge product page
- `/contact` — Contact form (Formspree-powered) with success banner

## Deployment

Deploys to Vercel with zero configuration. Vercel auto-detects Next.js 14.

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add a `FORMSPREE_ID` environment variable (optional — see Contact Form below).
4. Deploy.

## Custom Domain

In the Vercel dashboard → **Domains** → add `qasara.ai`.

Update DNS:
- `CNAME @ → cname.vercel-dns.com`

## Contact Form

The contact page submits to **Formspree**. To activate it:

1. Sign up at [formspree.io](https://formspree.io).
2. Create a form, copy the form ID.
3. Open [`app/contact/page.tsx`](app/contact/page.tsx) and replace the `FORMSPREE_ID` constant with your actual ID:
   ```ts
   const FORMSPREE_ID = "abcd1234";
   ```
4. Successful submissions redirect to `/contact?success=true`, which renders a green confirmation banner.

## File Structure

```
qasara-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── cove/page.tsx
│   ├── bridge/page.tsx
│   └── contact/
│       ├── page.tsx
│       └── SuccessBanner.tsx
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── ProductCard.tsx
│   ├── SectionHeader.tsx
│   ├── Reveal.tsx
│   └── Logo.tsx
├── public/
│   └── logo.svg
├── tailwind.config.ts
├── postcss.config.js
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Brand

- Primary background `#080B14` · Card `#111827`
- Accents: blue `#2563EB`, teal `#0D9488`, purple `#7C3AED`, mint `#00D4AA`
- Font: Inter (via `next/font/google`)
- Logo: hexagonal node, teal→blue gradient (preserved from prior brand)

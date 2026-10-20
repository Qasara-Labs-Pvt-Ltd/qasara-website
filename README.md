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
- `/contact` — Contact form (sent through AWS SES to support@qasara.ai)

## Deployment

Deploys to Vercel with zero configuration. Vercel auto-detects Next.js 14.

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the `MAIL_SMTP_*` environment variables (see Contact Form below).
4. Deploy.

## Custom Domain

In the Vercel dashboard → **Domains** → add `qasara.ai`.

Update DNS:
- `CNAME @ → cname.vercel-dns.com`

## Contact Form

The contact page posts to [`app/api/contact/route.ts`](app/api/contact/route.ts), a server-side route
(a Vercel function) that emails each enquiry to **support@qasara.ai** through Amazon SES over SMTP. The
credentials stay on the server: nothing without a `NEXT_PUBLIC_` prefix reaches the browser. The
visitor's address is set as Reply-To, so replying from the support inbox answers them directly. With
JS off the form still works: the route redirects back to `/contact?success=true` (or `?error=...`).

It uses the **same SES SMTP credentials as the Cove gateway** (`qasara-canton-gateway`,
`.env.mainnet.local`): copy the four `MAIL_SMTP_*` values into the Vercel project's environment
variables. They are SES *SMTP* credentials (generated in the SES console), not an IAM key pair.

| Variable | Required | Default |
| --- | --- | --- |
| `MAIL_SMTP_HOST` | yes | — (`email-smtp.eu-west-1.amazonaws.com`) |
| `MAIL_SMTP_PORT` | no | `587` (STARTTLS) |
| `MAIL_SMTP_USER` | yes | — |
| `MAIL_SMTP_PASS` | yes | — |
| `CONTACT_FROM_EMAIL` | no | `Qasara Website <support@qasara.ai>` |
| `CONTACT_TO_EMAIL` | no | `support@qasara.ai` |

The `qasara.ai` domain is verified in SES eu-west-1, so `support@qasara.ai` can send.

The StrategyForge "Join the pilot" form works the same way through
[`app/api/pilot/route.ts`](app/api/pilot/route.ts): one email per signup, subject
"StrategyForge — pilot waitlist: <email>". Both routes share [`lib/siteMail.ts`](lib/siteMail.ts).

## File Structure

```
qasara-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── cove/page.tsx
│   ├── bridge/page.tsx
│   ├── api/contact/route.ts
│   └── contact/
│       ├── page.tsx
│       ├── ContactForm.tsx
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

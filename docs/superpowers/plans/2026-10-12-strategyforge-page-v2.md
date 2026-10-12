# StrategyForge Page v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace qasara.ai/strategyforge with the approved v2 page: the hosted trading agent (sealed keys, a brain, your rules) in the StrategyForge forge theme, with an email-only pilot waitlist.

**Architecture:** `app/strategyforge/page.tsx` becomes a thin shell that wraps small server-component sections (`app/strategyforge/_sections/`) in a `.sf-theme` div. All copy that depends on which plans ship lives in one data module (`content.ts`) with two ship-gate switches; venue pills, venue cards, the hero sub and the page metadata are derived from the shown plans, so they cannot disagree. Theme CSS is a page-imported global stylesheet whose every rule is scoped under `.sf-theme` with `sf-` class names, so Nav, Footer and the rest of the site are untouched. A no-dependency node script checks the built HTML against the spec's copy rules and is the test.

**Tech Stack:** Next.js 14.2.18 App Router, React 18, TypeScript, `next/font/google` (Onest, JetBrains Mono), lucide-react 0.460, Formspree. npm (package-lock.json).

**Spec:** `docs/superpowers/specs/2026-10-11-strategyforge-page-v2-design.md` (approved 2026-10-12). Visual reference: `.superpowers/brainstorm/5885-1791719971/content/full-page-v2.html` (untracked, local only).

## Global Constraints

- No new npm dependencies. `next/font` is built in.
- Copy is exactly the spec §3 copy. Only §7 rows marked yes. No "non-custodial", no pricing, no self-hosting, sidecar, MCP or x402, no Temple API key, no withdrawal or funding promises, no Loop.
- Theme scoped to the page body: Nav and Footer keep the Qasara look. Tokens: bg `#0b0b0c`, surface `#161618`, surface-2 `#1c1c1f`, border `#2b2b2f`, ink `#e9eaed`, muted `#a3a4ab`, gold `#f0b429`, gold-hot `#ffd96b`, gold-deep `#b8770c`, pos `#34d399`, neg `#fb6a78`.
- Fonts: Onest 400-700 and JetBrains Mono 400/500, applied only inside `.sf-theme`. Numbers in mono with tabular figures.
- Mobile: single column below 860px, 16px side gutters, no horizontal scroll at 390px.
- Formspree endpoint `meedknag`. Hidden fields: `_subject` "StrategyForge — pilot waitlist", `product` "strategyforge", `source` "sf-page-v2", `_next` `https://qasara.ai/strategyforge?success=true`.
- No framer-motion `Reveal` on this page: every section renders visible without JS.
- Git identity for this repo: `anand@qasara.ai`. No `Co-Authored-By: Claude` trailer on any commit. Do not push; deploy is Anand's.
- Do not touch untracked `app/contact/Untitled-1.txt`, `docs/bd/` or `.superpowers/`.
- Low risk (marketing UI): no mutants. Proof = the copy guard plus screenshots at 1280 and 390. One diff review at the end.

## Review Focus

1. Phone at 390px: the email form and the hero glow push the page wider than the screen. Expect no horizontal scroll and a stacked form. Pinned by the mobile CSS in Task 2/3 and the 390 screenshot read in Task 5.
2. After submitting, Formspree sends the user to `?success=true` at the top of the page. Expect the "You're on the list" banner visible without scrolling. Pinned by placing the banner at the top of the page (Task 3) and the `?success=true` viewport screenshot (Task 5).
3. "Join the pilot" and "See how it works" jump under the 64px sticky nav and hide the heading. Expect the target heading visible below the nav. Pinned by `scroll-margin-top: 80px` (Task 2) and the `#how` viewport screenshot (Task 5).
4. Ship day with arb or Steady Swap off: Cantex or Tradecraft still shown somewhere (pill, card, hero sub, meta description). Expect each venue to appear only if a shown plan runs on it. Pinned by the flag-aware guard checks (Task 1) and the flags-off build (Task 5).
5. JS slow or off: sections stuck invisible, FAQ closed for good, form dead. Expect all content visible, native `<details>`, plain HTML form POST. Pinned by the guard's "no opacity:0" and form checks (Task 1).

## Lanes

One lane, tasks in order. Every task touches `app/strategyforge/` or the guard it feeds.

## File Structure

| File | Responsibility |
|---|---|
| `scripts/check-sf-copy.mjs` (create) | Copy guard: reads built HTML + `content.ts` flags, asserts spec copy rules |
| `package.json` (modify) | Add `check:sf` script |
| `app/strategyforge/content.ts` (create) | Ship-gate switches, plans, derived venues, hero sub, Formspree id, security URL |
| `app/strategyforge/fonts.ts` (create) | Onest and JetBrains Mono via next/font, as CSS variables |
| `app/strategyforge/sf-theme.css` (create) | All page styles, scoped under `.sf-theme` |
| `app/strategyforge/page.tsx` (rewrite) | Metadata + shell composing the sections |
| `app/strategyforge/SuccessBanner.tsx` (rewrite) | `?success=true` banner, new copy, forge styling |
| `app/strategyforge/_sections/Hero.tsx`, `AgentCard.tsx`, `Pillars.tsx`, `HowItWorks.tsx` (create) | Spec §3.1-3.3 |
| `app/strategyforge/_sections/Plans.tsx`, `CantDo.tsx`, `Venues.tsx`, `Faq.tsx`, `JoinForm.tsx` (create) | Spec §3.4-3.7, §5 |
| `app/page.tsx:88-96` (modify) | Home card copy, CTA and badge |

---

### Task 1: Copy guard (the failing test)

**Files:**
- Create: `scripts/check-sf-copy.mjs`
- Modify: `package.json` (scripts)

**Interfaces:**
- Consumes: `next build` output `.next/server/app/strategyforge.html` and `.next/server/app/index.html`; the lines `export const SHOW_ARB = true|false;` and `export const SHOW_STEADY_SWAP = true|false;` in `app/strategyforge/content.ts` (created in Task 2).
- Produces: `npm run check:sf` (exit 0 = pass, 1 = failed checks, 2 = missing build). Later tasks rely on these markup hooks: wrapper `class="sf-theme ..."`, `data-venue-pill="<Name>"`, `data-venue-card="<Name>"`, `id="how"`, `id="join"`, `href="#join"`, `href="#how"`.

- [ ] **Step 1: Write the guard**

Create `scripts/check-sf-copy.mjs`:

```js
// Copy guard for the StrategyForge page v2.
// Spec: docs/superpowers/specs/2026-10-11-strategyforge-page-v2-design.md (§3, §5, §6, §7, §8.6).
// Reads the prerendered HTML from `next build`; run `npm run build` first.
import { existsSync, readFileSync } from "node:fs";

const SF_HTML = ".next/server/app/strategyforge.html";
const HOME_HTML = ".next/server/app/index.html";
const CONTENT_TS = "app/strategyforge/content.ts";

function read(path) {
  if (!existsSync(path)) {
    console.error(`missing ${path} (run npm run build first)`);
    process.exit(2);
  }
  return readFileSync(path, "utf8");
}

function toText(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

function flag(src, name) {
  const m = src.match(new RegExp(`export const ${name} = (true|false);`));
  return m ? m[1] === "true" : null;
}

function inputTag(html, name) {
  return html.match(new RegExp(`<input[^>]*name="${name}"[^>]*>`))?.[0] ?? "";
}

function attr(tag, name) {
  return tag.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? null;
}

const sfRaw = read(SF_HTML);
const homeRaw = read(HOME_HTML);
const contentSrc = existsSync(CONTENT_TS) ? readFileSync(CONTENT_TS, "utf8") : "";

// Page body only: from the .sf-theme wrapper to the site footer. Nav, footer and the RSC payload are site-wide.
const start = sfRaw.indexOf('class="sf-theme');
const end = start >= 0 ? sfRaw.indexOf("<footer", start) : -1;
const body = start >= 0 && end > start ? sfRaw.slice(start, end) : "";
const text = toText(body);
const title = sfRaw.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
const metaDesc = toText(sfRaw.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
const homeText = toText(homeRaw);

const SHOW_ARB = flag(contentSrc, "SHOW_ARB");
const SHOW_STEADY_SWAP = flag(contentSrc, "SHOW_STEADY_SWAP");
const pills = [...body.matchAll(/data-venue-pill="([^"]+)"/g)].map((m) => m[1]);
const cards = [...body.matchAll(/data-venue-card="([^"]+)"/g)].map((m) => m[1]);

const checks = [];
const check = (name, ok) => checks.push([name, Boolean(ok)]);

// Wrapper and switches
check("page body wrapped in .sf-theme", body.length > 0);
check("content.ts declares SHOW_ARB and SHOW_STEADY_SWAP", SHOW_ARB !== null && SHOW_STEADY_SWAP !== null);
check("no section hidden until JS runs (opacity:0)", !/opacity:\s*0[;"]/.test(body));

// §3.1 Hero
check("H1", /Your trading agent on Canton\./.test(text));
check("hero sub", text.includes("inside limits you set. Its keys are sealed in a hardware enclave."));
check("hero Join the pilot -> #join", body.includes('href="#join"'));
check("hero See how it works -> #how", body.includes('href="#how"'));
check("agent card Example label", text.includes("Example"));
check("agent card brain note", text.includes("Widened the spread band from 0.4% to 0.6%."));
check("agent card footer", text.includes("Keys sealed in a hardware enclave"));

// §6 Metadata
check("title", title.startsWith("StrategyForge: your trading agent on Canton"));
check("meta description is the hero sub", metaDesc.startsWith("It trades for you on ") && metaDesc.includes("Its keys are sealed in a hardware enclave."));

// §3.2 Pillars, §3.3 How it works
check("pillars H2", text.includes("An agent you can actually trust with money."));
check("pillar sealed keys", text.includes("Our staff can't read them, and only approved enclave code can use them."));
check("pillar brain", text.includes("It never touches your size or loss limits, and it tells you why for every change."));
check("pillar rules", text.includes("It halts itself when something looks wrong and waits for you."));
check("how section id", body.includes('id="how"'));
check(
  "four steps",
  ["Create your agent", "Connect your venue account", "Pick a plan and set limits", "Watch it work"].every((s) => text.includes(s)),
);

// §3.4 Plans
check(
  "four Temple plans",
  ["Earn the spread", "Buy a bit at a time", "Buy or sell at your price", "Protect your gains"].every((s) => text.includes(s)),
);
check("one plan at a time", text.includes("Each agent runs one plan at a time, so you always know what it's doing."));
check("brain chip on MM", text.includes("brain available"));
check("arb card matches SHOW_ARB", text.includes("Catch price gaps") === SHOW_ARB);
check("Steady swap card matches SHOW_STEADY_SWAP", text.includes("Steady swap") === SHOW_STEADY_SWAP);

// §3.5 Can't do
check(
  "four can't rows",
  ["Trade outside your plan", "Change your size or loss limits", "Keep going when something breaks", "Let our staff read its keys"].every(
    (s) => text.includes(s),
  ),
);
check("security link", body.includes('href="https://strategyforge.qasara.ai/security"') && text.includes("How we protect your keys"));

// §3.6 Venues + §8.6 (a venue shows only if a shown plan runs on it)
const expected = ["Temple", ...(SHOW_ARB || SHOW_STEADY_SWAP ? ["Tradecraft"] : []), ...(SHOW_ARB ? ["Cantex"] : [])];
check(`hero pills are ${expected.join(", ")}`, pills.join(",") === expected.join(","));
check(`venue cards are ${expected.join(", ")}`, cards.join(",") === expected.join(","));
check("Cantex named nowhere unless arb shows", SHOW_ARB || !/Cantex/.test(text + metaDesc));
check("Tradecraft named nowhere unless arb or swap shows", SHOW_ARB || SHOW_STEADY_SWAP || !/Tradecraft/.test(text + metaDesc));

// §3.7 FAQ + §5 join
check("five FAQ entries", (body.match(/<details/g) ?? []).length === 5);
check("join section id", body.includes('id="join"'));
check("form posts to Formspree meedknag", body.includes('action="https://formspree.io/f/meedknag"') && /method="post"/i.test(body));
const email = inputTag(body, "email");
check("email input is type=email and required", attr(email, "type") === "email" && /\srequired(=""|\s|\/|>)/.test(email));
check("hidden _subject", attr(inputTag(body, "_subject"), "value") === "StrategyForge — pilot waitlist");
check("hidden product", attr(inputTag(body, "product"), "value") === "strategyforge");
check("hidden source", attr(inputTag(body, "source"), "value") === "sf-page-v2");
check("hidden _next", attr(inputTag(body, "_next"), "value") === "https://qasara.ai/strategyforge?success=true");
check("final block", text.includes("Put an agent to work."));
check("risk line", text.includes("StrategyForge is software. Nothing here is financial advice. Automated trading carries risk."));

// §2/§7/§9 banned copy (page body, title, meta description)
const banned = [
  /non-custodial/i,
  /api key/i,
  /withdraw/i,
  /\bLoop\b/,
  /self-host/i,
  /sidecar/i,
  /\bMCP\b/,
  /x402/i,
  /pricing/i,
  /per month/i,
  /\$\d/,
  /including us/i,
  /never leave your control/i,
  /early access/i,
  /\bladder/i,
  /rebalanc/i,
];
for (const re of banned) check(`no ${re}`, !re.test(text) && !re.test(title) && !re.test(metaDesc));

// §6 home card
check("home card description", homeText.includes("Your trading agent on Canton: sealed keys, a brain, and limits you set."));
check("home card old line gone", !homeText.includes("never leave your control"));
check("home card CTA", homeText.includes("Join the pilot"));

const failed = checks.filter(([, ok]) => !ok);
for (const [name, ok] of checks) console.log(`${ok ? "ok  " : "FAIL"} ${name}`);
console.log(`\n${checks.length - failed.length}/${checks.length} checks pass`);
process.exit(failed.length ? 1 : 0);
```

- [ ] **Step 2: Add the npm script**

In `package.json` `"scripts"`, add after `"lint"`:

```json
    "check:sf": "node scripts/check-sf-copy.mjs"
```

(Add the comma on the `"lint"` line.)

- [ ] **Step 3: Build and run the guard against the old page**

Run: `npm run build 2>&1 | tail -25 && npm run check:sf 2>&1 | tail -15`
Expected: build succeeds; guard exits 1 with most checks FAIL (first line `FAIL page body wrapped in .sf-theme`). If the build fails on the unchanged page, stop and report: the baseline is broken.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-sf-copy.mjs package.json
git commit -m "test(strategyforge): copy guard for page v2 (fails against the old page)"
```

---

### Task 2: Theme, content module, hero to how-it-works

**Files:**
- Create: `app/strategyforge/content.ts`, `app/strategyforge/fonts.ts`, `app/strategyforge/sf-theme.css`
- Create: `app/strategyforge/_sections/Hero.tsx`, `AgentCard.tsx`, `Pillars.tsx`, `HowItWorks.tsx`
- Rewrite: `app/strategyforge/page.tsx`

**Interfaces:**
- Consumes: guard hooks from Task 1.
- Produces (used by Task 3):
  - `content.ts`: `SHOW_ARB: boolean`, `SHOW_STEADY_SWAP: boolean`, `FORMSPREE_ID = "meedknag"`, `SECURITY_URL`, `type PlanId`, `type Plan`, `PLANS: Plan[]` (shown plans only), `type Venue = { name: string; blurb: string }`, `VENUES: Venue[]` (shown venues only), `HERO_SUB: string`, `joinList(items: string[]): string`.
  - `fonts.ts`: `sfSans`, `sfMono` (next/font objects; `.variable` sets `--sf-font-sans` / `--sf-font-mono`).
  - CSS classes in `sf-theme.css` (all under `.sf-theme`): `sf-section sf-eyebrow sf-lead sf-gold sf-mono sf-btn sf-btn-sm sf-rule sf-textlink sf-dot sf-chip sf-chip-gold sf-plans sf-plan sf-what sf-meta sf-cant sf-list sf-row sf-x sf-seal sf-ring sf-link sf-vgrid sf-v sf-top sf-live sf-faq sf-final sf-email sf-risk sf-sr-only sf-success-wrap sf-success`.

- [ ] **Step 1: Create the content module**

`app/strategyforge/content.ts`:

```ts
// StrategyForge page v2 content (spec docs/superpowers/specs/2026-10-11-strategyforge-page-v2-design.md).

// Ship gate §8.4: set both from sfstate on ship day. Venues, the hero sub and the metadata follow
// from the shown plans (§8.6), so these two lines are the only edit.
export const SHOW_ARB = true;
export const SHOW_STEADY_SWAP = true;

export const FORMSPREE_ID = "meedknag"; // shared site endpoint; StrategyForge leads segmented by hidden fields
export const SECURITY_URL = "https://strategyforge.qasara.ai/security";

export type PlanId = "spread" | "dca" | "trigger" | "trailing" | "arb" | "swap";

export type Plan = {
  id: PlanId;
  title: string;
  what: string;
  chips: string[];
  brain?: boolean;
  /** How a venue card names this plan, e.g. "price triggers". */
  venueLabel: string;
  show: boolean;
};

const ALL_PLANS: Plan[] = [
  {
    id: "spread",
    title: "Earn the spread",
    what: "Quotes buy and sell orders around the price and earns the gap between them. Keeps its inventory in check.",
    chips: ["market making", "Temple"],
    brain: true,
    venueLabel: "market making",
    show: true,
  },
  {
    id: "dca",
    title: "Buy a bit at a time",
    what: "Buys a set amount on a schedule, so you build a position slowly instead of guessing the bottom.",
    chips: ["DCA", "Temple"],
    venueLabel: "DCA",
    show: true,
  },
  {
    id: "trigger",
    title: "Buy or sell at your price",
    what: "Waits for the price you name, then enters or exits. No need to watch the chart.",
    chips: ["price trigger", "entry / exit", "Temple"],
    venueLabel: "price triggers",
    show: true,
  },
  {
    id: "trailing",
    title: "Protect your gains",
    what: "A stop that follows the price up. If the market turns, it sells before you give back your gains.",
    chips: ["trailing stop", "Temple"],
    venueLabel: "trailing stops",
    show: true,
  },
  {
    id: "arb",
    title: "Catch price gaps",
    what: "Spots when a coin is cheaper on one pool than the other, and buys low, sells high from the agent's own wallet.",
    chips: ["arbitrage", "Cantex ↔ Tradecraft", "its own wallet"],
    venueLabel: "price-gap trades",
    show: SHOW_ARB,
  },
  {
    id: "swap",
    title: "Steady swap",
    what: "Swaps a little at a time on a pool, with a daily cost cap you set.",
    chips: ["swaps", "Tradecraft", "its own wallet"],
    venueLabel: "swaps",
    show: SHOW_STEADY_SWAP,
  },
];

export const PLANS: Plan[] = ALL_PLANS.filter((p) => p.show);

const ALL_VENUES: { name: string; kind: string; planIds: PlanId[] }[] = [
  { name: "Temple", kind: "Order book exchange.", planIds: ["spread", "dca", "trigger", "trailing"] },
  { name: "Tradecraft", kind: "AMM swap pools.", planIds: ["swap", "arb"] },
  { name: "Cantex", kind: "AMM swap pools.", planIds: ["arb"] },
];

export type Venue = { name: string; blurb: string };

/** ["a"] -> "a"; ["a", "b", "c"] -> "a, b and c". */
export function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const shownIds = new Set(PLANS.map((p) => p.id));

export const VENUES: Venue[] = ALL_VENUES.flatMap((v) => {
  const labels = v.planIds
    .filter((id) => shownIds.has(id))
    .map((id) => ALL_PLANS.find((p) => p.id === id)!.venueLabel);
  if (labels.length === 0) return [];
  const list = joinList(labels);
  return [{ name: v.name, blurb: `${v.kind} ${list[0].toUpperCase()}${list.slice(1)}.` }];
});

export const HERO_SUB = `It trades for you on ${joinList(VENUES.map((v) => v.name))}, inside limits you set. Its keys are sealed in a hardware enclave.`;
```

With both switches on this yields the spec's exact blurbs ("Market making, DCA, price triggers and trailing stops.", "Swaps and price-gap trades.", "Price-gap trades.") and hero sub ("It trades for you on Temple, Tradecraft and Cantex, ...").

- [ ] **Step 2: Create the fonts module**

`app/strategyforge/fonts.ts`:

```ts
import { JetBrains_Mono, Onest } from "next/font/google";

// Scoped to the .sf-theme wrapper via CSS variables; the rest of the site keeps Inter.
export const sfSans = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--sf-font-sans",
  display: "swap",
});

export const sfMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--sf-font-mono",
  display: "swap",
});
```

- [ ] **Step 3: Create the theme stylesheet (whole file, used by Task 3 too)**

`app/strategyforge/sf-theme.css`:

```css
/* StrategyForge page v2 theme (spec §4). Every rule is scoped under .sf-theme with sf- class
   names; Nav, Footer and the rest of qasara.ai keep the Qasara look. */
.sf-theme {
  --sf-bg: #0b0b0c;
  --sf-s1: #161618;
  --sf-s2: #1c1c1f;
  --sf-line: #2b2b2f;
  --sf-ink: #e9eaed;
  --sf-mut: #a3a4ab;
  --sf-dim: #6f7077;
  --sf-gold: #f0b429;
  --sf-gold-hot: #ffd96b;
  --sf-gold-deep: #b8770c;
  --sf-pos: #34d399;
  --sf-neg: #fb6a78;
  background: var(--sf-bg);
  color: var(--sf-ink);
  font-family: var(--sf-font-sans), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  overflow-x: clip;
}
.sf-theme [id] { scroll-margin-top: 80px; }
.sf-theme h1, .sf-theme h2, .sf-theme h3, .sf-theme h4 { color: var(--sf-ink); font-weight: 700; }
.sf-theme .sf-mono { font-family: var(--sf-font-mono), ui-monospace, monospace; font-variant-numeric: tabular-nums; }
.sf-theme .sf-section { max-width: 1120px; margin: 0 auto; padding: 72px 24px; position: relative; }
.sf-theme .sf-eyebrow { font-family: var(--sf-font-mono), ui-monospace, monospace; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--sf-gold); }
.sf-theme h2 { font-size: 38px; letter-spacing: -.03em; line-height: 1.08; margin: 12px 0; }
.sf-theme .sf-lead { color: var(--sf-mut); font-size: 17px; line-height: 1.55; max-width: 600px; margin: 0 0 36px; }
.sf-theme .sf-gold { background: linear-gradient(92deg, var(--sf-gold-hot), var(--sf-gold) 45%, var(--sf-gold-deep)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.sf-theme .sf-btn { display: inline-block; cursor: pointer; text-decoration: none; border-radius: 999px; padding: 13px 24px; font-weight: 600; font-size: 15px; border: 0; background: linear-gradient(180deg, var(--sf-gold-hot), var(--sf-gold) 55%, #d99a14); color: #1a1305; box-shadow: 0 8px 28px rgba(240, 180, 41, .28), inset 0 1px 0 #fff6; font-family: inherit; }
.sf-theme .sf-btn:hover { filter: brightness(1.06); }
.sf-theme .sf-btn-sm { padding: 11px 20px; }
.sf-theme a:focus-visible, .sf-theme button:focus-visible, .sf-theme summary:focus-visible, .sf-theme input:focus-visible { outline: 2px solid var(--sf-gold); outline-offset: 3px; }
.sf-theme .sf-rule { border: 0; border-top: 1px solid #1d1d20; margin: 0; }
.sf-theme .sf-textlink { color: var(--sf-ink); text-decoration: none; }
.sf-theme .sf-textlink:hover { color: var(--sf-gold); }
.sf-theme .sf-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sf-pos); box-shadow: 0 0 8px var(--sf-pos); display: inline-block; }
.sf-theme .sf-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

/* success banner (top of page, visible on landing from Formspree) */
.sf-theme .sf-success-wrap { max-width: 1120px; margin: 0 auto; padding: 24px 24px 0; }
.sf-theme .sf-success { display: flex; gap: 12px; align-items: center; border-radius: 14px; padding: 14px 18px; background: #34d3991a; border: 1px solid #34d39955; color: var(--sf-ink); font-size: 15px; }
.sf-theme .sf-success svg { color: var(--sf-pos); flex: none; width: 20px; height: 20px; }

/* hero */
.sf-theme .sf-hero { display: grid; grid-template-columns: 1.05fr .95fr; gap: 44px; align-items: center; padding-top: 40px; }
.sf-theme .sf-hero::before { content: ""; position: absolute; right: -60px; top: 20px; width: 560px; height: 560px; background: radial-gradient(circle, rgba(240, 180, 41, .18), transparent 62%); pointer-events: none; z-index: 0; }
.sf-theme .sf-hero::after { content: ""; position: absolute; inset: 0; background-image: linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px); background-size: 48px 48px; -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 20%, transparent 70%); mask-image: radial-gradient(ellipse at 50% 40%, #000 20%, transparent 70%); pointer-events: none; z-index: 0; }
.sf-theme .sf-hero > * { position: relative; z-index: 1; min-width: 0; }
.sf-theme .sf-hero h1 { font-size: 56px; line-height: 1.02; letter-spacing: -.035em; margin: 14px 0 18px; }
.sf-theme .sf-sub { font-size: 18px; line-height: 1.55; color: var(--sf-mut); max-width: 470px; margin: 0 0 26px; }
.sf-theme .sf-cta-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
.sf-theme .sf-venues { margin-top: 28px; display: flex; gap: 10px; align-items: center; font-size: 12px; flex-wrap: wrap; }
.sf-theme .sf-venues-label { opacity: .6; }
.sf-theme .sf-venue { border-radius: 999px; padding: 5px 11px; display: flex; gap: 6px; align-items: center; background: var(--sf-s1); border: 1px solid var(--sf-line); }

/* agent card */
.sf-theme .sf-acard { border-radius: 16px; padding: 18px; background: linear-gradient(180deg, var(--sf-s2), var(--sf-s1)); border: 1px solid var(--sf-line); box-shadow: 0 30px 80px -20px #000, 0 0 0 1px #f0b4290f; position: relative; }
.sf-theme .sf-example { position: absolute; top: -10px; left: 18px; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; background: #232327; border: 1px solid var(--sf-line); border-radius: 999px; padding: 2px 9px; color: var(--sf-mut); }
.sf-theme .sf-crow { display: flex; justify-content: space-between; align-items: center; }
.sf-theme .sf-an { font-weight: 600; display: flex; gap: 10px; align-items: center; }
.sf-theme .sf-av { width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; font-weight: 700; background: linear-gradient(135deg, var(--sf-gold-hot), var(--sf-gold-deep)); color: #1a1305; }
.sf-theme .sf-st { font-size: 11px; border-radius: 999px; padding: 4px 9px; background: #34d3991a; color: var(--sf-pos); display: flex; gap: 6px; align-items: center; }
.sf-theme .sf-bal { font-size: 34px; margin: 16px 0 2px; }
.sf-theme .sf-bal-unit { font-size: 16px; opacity: .6; }
.sf-theme .sf-pnl { font-size: 13px; color: var(--sf-pos); }
.sf-theme .sf-g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 12px 0; }
.sf-theme .sf-cell { border-radius: 10px; padding: 9px 10px; background: #0f0f11; border: 1px solid #232327; min-width: 0; }
.sf-theme .sf-k { font-size: 10px; text-transform: uppercase; letter-spacing: .1em; opacity: .6; margin-bottom: 4px; }
.sf-theme .sf-v { font-size: 13px; }
.sf-theme .sf-brain { border-radius: 12px; padding: 11px 12px; font-size: 13px; line-height: 1.45; background: #f0b4290d; border: 1px solid #f0b42933; }
.sf-theme .sf-brain .sf-k { color: var(--sf-gold); opacity: 1; letter-spacing: .12em; margin-bottom: 5px; }
.sf-theme .sf-card-foot { margin-top: 10px; font-size: 11.5px; opacity: .75; display: flex; gap: 6px; align-items: center; }
.sf-theme .sf-card-foot svg { width: 13px; height: 13px; }

/* pillars */
.sf-theme .sf-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.sf-theme .sf-pill { background: var(--sf-s1); border: 1px solid var(--sf-line); border-radius: 16px; padding: 24px; }
.sf-theme .sf-ic { width: 40px; height: 40px; border-radius: 11px; display: grid; place-items: center; background: #f0b42914; border: 1px solid #f0b42933; color: var(--sf-gold); margin-bottom: 18px; }
.sf-theme .sf-ic svg { width: 20px; height: 20px; }
.sf-theme .sf-pill h3 { margin: 0 0 8px; font-size: 20px; letter-spacing: -.01em; }
.sf-theme .sf-pill p { margin: 0; color: var(--sf-mut); line-height: 1.55; font-size: 15px; }
.sf-theme .sf-mini { margin-top: 18px; font-size: 12px; color: var(--sf-dim); border-top: 1px solid #232327; padding-top: 12px; }

/* steps */
.sf-theme .sf-steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--sf-line); border: 1px solid var(--sf-line); border-radius: 16px; overflow: hidden; }
.sf-theme .sf-step { padding: 24px; background: var(--sf-s1); }
.sf-theme .sf-n { font-family: var(--sf-font-mono), ui-monospace, monospace; color: var(--sf-gold); font-size: 13px; margin-bottom: 28px; }
.sf-theme .sf-step h3 { margin: 0 0 8px; font-size: 17px; }
.sf-theme .sf-step p { margin: 0; color: var(--sf-mut); font-size: 14px; line-height: 1.5; }

/* plans */
.sf-theme .sf-plans { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.sf-theme .sf-plan { background: var(--sf-s1); border: 1px solid var(--sf-line); border-radius: 16px; padding: 22px; display: grid; grid-template-columns: 1fr auto; gap: 6px 18px; align-items: start; }
.sf-theme .sf-plan h3 { margin: 0; font-size: 19px; }
.sf-theme .sf-plan svg { width: 96px; height: 36px; }
.sf-theme .sf-what { grid-column: 1 / -1; color: var(--sf-mut); font-size: 15px; line-height: 1.5; margin: 4px 0 10px; }
.sf-theme .sf-meta { grid-column: 1 / -1; display: flex; gap: 8px; flex-wrap: wrap; }
.sf-theme .sf-chip { font-size: 11px; font-family: var(--sf-font-mono), ui-monospace, monospace; border: 1px solid var(--sf-line); border-radius: 999px; padding: 3px 9px; color: var(--sf-mut); }
.sf-theme .sf-chip-gold { color: var(--sf-gold); border-color: #f0b42955; }

/* can't do */
.sf-theme .sf-cant { display: grid; grid-template-columns: .9fr 1.1fr; gap: 40px; align-items: start; }
.sf-theme .sf-list { display: flex; flex-direction: column; gap: 10px; margin: 0; padding: 0; list-style: none; }
.sf-theme .sf-row { display: flex; gap: 14px; align-items: flex-start; background: var(--sf-s1); border: 1px solid var(--sf-line); border-radius: 14px; padding: 16px 18px; }
.sf-theme .sf-x { flex: none; width: 26px; height: 26px; border-radius: 8px; display: grid; place-items: center; background: #fb6a7814; color: var(--sf-neg); }
.sf-theme .sf-x svg { width: 15px; height: 15px; }
.sf-theme .sf-row b { display: block; font-weight: 600; margin-bottom: 3px; }
.sf-theme .sf-row span { color: var(--sf-mut); font-size: 14px; line-height: 1.45; }
.sf-theme .sf-seal { background: radial-gradient(circle at 50% 30%, #f0b4291f, transparent 60%), var(--sf-s1); border: 1px solid var(--sf-line); border-radius: 18px; padding: 28px; text-align: center; }
.sf-theme .sf-ring { width: 120px; height: 120px; margin: 6px auto 18px; border-radius: 50%; border: 1px solid #f0b42955; display: grid; place-items: center; box-shadow: 0 0 0 10px #f0b4290a, 0 0 0 22px #f0b42906; }
.sf-theme .sf-ring > div { width: 64px; height: 64px; border-radius: 16px; background: linear-gradient(135deg, var(--sf-gold-hot), var(--sf-gold-deep)); display: grid; place-items: center; color: #1a1305; }
.sf-theme .sf-ring svg { width: 28px; height: 28px; }
.sf-theme .sf-seal p { color: var(--sf-mut); font-size: 14px; line-height: 1.5; margin: 0 0 14px; }
.sf-theme .sf-link { color: var(--sf-gold); font-size: 14px; text-decoration: none; }
.sf-theme .sf-link:hover { text-decoration: underline; }

/* venues */
.sf-theme .sf-vgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.sf-theme .sf-v { background: var(--sf-s1); border: 1px solid var(--sf-line); border-radius: 16px; padding: 22px; }
.sf-theme .sf-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.sf-theme .sf-v h3 { margin: 0; font-size: 20px; }
.sf-theme .sf-live { font-size: 11px; color: var(--sf-pos); display: flex; gap: 6px; align-items: center; }
.sf-theme .sf-v p { margin: 0; color: var(--sf-mut); font-size: 14px; line-height: 1.5; }

/* faq */
.sf-theme .sf-faq { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 28px; align-items: start; }
.sf-theme details { background: var(--sf-s1); border: 1px solid var(--sf-line); border-radius: 14px; padding: 16px 18px; }
.sf-theme summary { cursor: pointer; font-weight: 600; list-style: none; }
.sf-theme summary::-webkit-details-marker { display: none; }
.sf-theme summary::after { content: "+"; float: right; color: var(--sf-gold); }
.sf-theme details[open] summary::after { content: "–"; }
.sf-theme details p { color: var(--sf-mut); font-size: 14px; line-height: 1.55; margin: 10px 0 0; }

/* join */
.sf-theme .sf-final { text-align: center; border: 1px solid var(--sf-line); border-radius: 22px; background: radial-gradient(ellipse at 50% 0, #f0b42922, transparent 60%), var(--sf-s1); padding: 56px 24px; margin-bottom: 40px; }
.sf-theme .sf-final h2 { font-size: 40px; }
.sf-theme .sf-final .sf-lead { margin: 0 auto 26px; }
.sf-theme .sf-email { display: inline-flex; gap: 8px; background: #0f0f11; border: 1px solid var(--sf-line); border-radius: 999px; padding: 6px; max-width: 100%; }
.sf-theme .sf-email input { background: transparent; border: 0; color: var(--sf-ink); padding: 0 14px; width: 240px; min-width: 0; font-family: inherit; font-size: 15px; outline: none; }
.sf-theme .sf-email input::placeholder { color: var(--sf-dim); }
.sf-theme .sf-risk { color: var(--sf-dim); font-size: 12px; text-align: center; margin: 0; }

@media (max-width: 859px) {
  .sf-theme .sf-section { padding: 56px 16px; }
  .sf-theme .sf-success-wrap { padding: 16px 16px 0; }
  .sf-theme .sf-hero, .sf-theme .sf-cant { grid-template-columns: 1fr; }
  .sf-theme .sf-pillars, .sf-theme .sf-vgrid, .sf-theme .sf-plans, .sf-theme .sf-faq { grid-template-columns: 1fr; }
  .sf-theme .sf-steps { grid-template-columns: 1fr 1fr; }
  .sf-theme .sf-hero h1 { font-size: 40px; }
  .sf-theme h2, .sf-theme .sf-final h2 { font-size: 30px; }
  .sf-theme .sf-hero::before { width: 360px; height: 360px; right: -140px; }
  .sf-theme .sf-final { padding: 40px 16px; }
  .sf-theme .sf-email { display: flex; flex-direction: column; border-radius: 18px; width: 100%; }
  .sf-theme .sf-email input { width: 100%; padding: 12px 14px; }
}
@media (max-width: 479px) {
  .sf-theme .sf-steps { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: Create the agent card**

`app/strategyforge/_sections/AgentCard.tsx`:

```tsx
import { Lock } from "lucide-react";

// Static illustration (spec §3.1). Numbers are made up; the "Example" label says so.
export function AgentCard() {
  return (
    <div className="sf-acard">
      <div className="sf-example">Example</div>
      <div className="sf-crow">
        <div className="sf-an">
          <div className="sf-av" aria-hidden="true">
            A
          </div>
          Atlas
        </div>
        <div className="sf-st">
          <i className="sf-dot" aria-hidden="true" />
          Running
        </div>
      </div>
      <div className="sf-bal sf-mono">
        2,431.20 <span className="sf-bal-unit">CC</span>
      </div>
      <div className="sf-pnl sf-mono">+38.70 CC this week</div>
      <div className="sf-g3">
        <Cell k="Plan" v="Earn the spread" />
        <Cell k="Max position" v="3,000 CC" mono />
        <Cell k="Loss limit" v="150 USDCx" mono />
      </div>
      <div className="sf-brain">
        <div className="sf-k">◆ Brain · 2 min ago</div>
        Volatility doubled in the last hour. Widened the spread band from 0.4% to 0.6%.
      </div>
      <div className="sf-card-foot">
        <Lock aria-hidden="true" />
        Keys sealed in a hardware enclave
      </div>
    </div>
  );
}

function Cell({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="sf-cell">
      <div className="sf-k">{k}</div>
      <div className={mono ? "sf-v sf-mono" : "sf-v"}>{v}</div>
    </div>
  );
}
```

- [ ] **Step 5: Create the hero**

`app/strategyforge/_sections/Hero.tsx`:

```tsx
import { HERO_SUB, VENUES } from "../content";
import { AgentCard } from "./AgentCard";

export function Hero() {
  return (
    <section className="sf-section sf-hero">
      <div>
        <div className="sf-eyebrow">StrategyForge · on Canton</div>
        <h1>
          Your trading agent
          <br /> on <span className="sf-gold">Canton.</span>
        </h1>
        <p className="sf-sub">{HERO_SUB}</p>
        <div className="sf-cta-row">
          <a href="#join" className="sf-btn">
            Join the pilot
          </a>
          <a href="#how" className="sf-textlink">
            See how it works →
          </a>
        </div>
        <div className="sf-venues">
          <span className="sf-venues-label">Trades on</span>
          {VENUES.map((v) => (
            <span key={v.name} className="sf-venue" data-venue-pill={v.name}>
              <i className="sf-dot" aria-hidden="true" />
              {v.name}
            </span>
          ))}
        </div>
      </div>
      <AgentCard />
    </section>
  );
}
```

- [ ] **Step 6: Create the pillars**

`app/strategyforge/_sections/Pillars.tsx`:

```tsx
import { Brain, KeyRound, SlidersHorizontal } from "lucide-react";

const PILLARS = [
  {
    Icon: KeyRound,
    title: "Sealed keys",
    body: "Your agent's keys live inside a hardware enclave. Our staff can't read them, and only approved enclave code can use them.",
    mini: "hardware enclave · approved code only",
  },
  {
    Icon: Brain,
    title: "A brain",
    body: "On market-making plans, the brain watches the market and tunes your spread and pacing. It never touches your size or loss limits, and it tells you why for every change.",
    mini: "market-making plans · switch it on per plan",
  },
  {
    Icon: SlidersHorizontal,
    title: "Your rules",
    body: "You pick the plan and set the limits. It halts itself when something looks wrong and waits for you. Pause or stop any time.",
    mini: "max position · loss limit · pause · stop",
  },
];

export function Pillars() {
  return (
    <section className="sf-section">
      <div className="sf-eyebrow">Why it&apos;s different</div>
      <h2>
        An agent you can actually trust
        <br /> with money.
      </h2>
      <p className="sf-lead">
        Most trading bots are a script with your keys. Your StrategyForge agent is built the other way round: safe
        first, smart second.
      </p>
      <div className="sf-pillars">
        {PILLARS.map(({ Icon, title, body, mini }) => (
          <div key={title} className="sf-pill">
            <div className="sf-ic">
              <Icon aria-hidden="true" strokeWidth={1.75} />
            </div>
            <h3>{title}</h3>
            <p>{body}</p>
            <div className="sf-mini sf-mono">{mini}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Create how it works**

`app/strategyforge/_sections/HowItWorks.tsx`:

```tsx
const STEPS = [
  { title: "Create your agent", body: "Name it. It's ready in seconds." },
  { title: "Connect your venue account", body: "Link the venue you trade on. Takes a minute." },
  { title: "Pick a plan and set limits", body: "Choose what it should do and how far it can go." },
  { title: "Watch it work", body: "See every trade and every brain decision. Pause, change or stop any time." },
];

export function HowItWorks() {
  return (
    <section id="how" className="sf-section">
      <div className="sf-eyebrow">How it works</div>
      <h2>Live in four steps.</h2>
      <p className="sf-lead">No servers or scripts to run.</p>
      <ol className="sf-steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className="sf-step">
            <div className="sf-n">{String(i + 1).padStart(2, "0")}</div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 8: Rewrite the page shell**

Replace the whole of `app/strategyforge/page.tsx` with (Task 3 adds the remaining sections):

```tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { HERO_SUB } from "./content";
import { sfMono, sfSans } from "./fonts";
import { SuccessBanner } from "./SuccessBanner";
import { Hero } from "./_sections/Hero";
import { HowItWorks } from "./_sections/HowItWorks";
import { Pillars } from "./_sections/Pillars";
import "./sf-theme.css";

const TITLE = "StrategyForge: your trading agent on Canton";

export const metadata: Metadata = {
  title: TITLE,
  description: HERO_SUB,
  openGraph: { title: TITLE, description: HERO_SUB },
};

export default function StrategyForgePage() {
  return (
    <div className={`sf-theme ${sfSans.variable} ${sfMono.variable}`}>
      <Suspense fallback={null}>
        <SuccessBanner />
      </Suspense>
      <Hero />
      <hr className="sf-rule" />
      <Pillars />
      <HowItWorks />
    </div>
  );
}
```

- [ ] **Step 9: Build and run the guard**

Run: `npm run build 2>&1 | tail -25 && npm run check:sf 2>&1 | grep -E "FAIL|checks pass"`
Expected: build passes (route `/strategyforge` listed as static `○`). Wrapper, hero, metadata, pillars, steps and most banned-copy checks pass. Still FAIL: plans, can't rows, security link, venue cards, FAQ, join/form/hidden fields, final block, risk line, home card. If `/strategyforge` is not static (`ƒ`), stop: the guard needs the prerendered HTML.

- [ ] **Step 10: Commit**

```bash
git add app/strategyforge/content.ts app/strategyforge/fonts.ts app/strategyforge/sf-theme.css app/strategyforge/_sections app/strategyforge/page.tsx
git commit -m "feat(strategyforge): page v2 theme, hero, pillars and how it works"
```

---

### Task 3: Plans, can't-do, venues, FAQ, join form, success banner

**Files:**
- Create: `app/strategyforge/_sections/Plans.tsx`, `CantDo.tsx`, `Venues.tsx`, `Faq.tsx`, `JoinForm.tsx`
- Rewrite: `app/strategyforge/SuccessBanner.tsx`
- Modify: `app/strategyforge/page.tsx` (imports + JSX)

**Interfaces:**
- Consumes: from `content.ts`: `PLANS`, `type PlanId`, `VENUES`, `FORMSPREE_ID`, `SECURITY_URL`. CSS classes from `sf-theme.css` (Task 2).
- Produces: the full page; `SuccessBanner()` (client component, renders `null` unless `?success=true`).

- [ ] **Step 1: Create the plans section**

`app/strategyforge/_sections/Plans.tsx`:

```tsx
import type { ReactElement } from "react";
import { PLANS, type PlanId } from "../content";

const ICONS: Record<PlanId, ReactElement> = {
  spread: (
    <svg viewBox="0 0 96 36" aria-hidden="true">
      <g stroke="#f0b429" strokeWidth="2">
        <line x1="6" y1="8" x2="90" y2="8" opacity=".9" />
        <line x1="6" y1="14" x2="90" y2="14" opacity=".55" />
        <line x1="6" y1="22" x2="90" y2="22" stroke="#34d399" opacity=".55" />
        <line x1="6" y1="28" x2="90" y2="28" stroke="#34d399" opacity=".9" />
      </g>
    </svg>
  ),
  dca: (
    <svg viewBox="0 0 96 36" aria-hidden="true">
      <g fill="#f0b429">
        <rect x="8" y="22" width="10" height="10" rx="2" />
        <rect x="28" y="22" width="10" height="10" rx="2" opacity=".8" />
        <rect x="48" y="22" width="10" height="10" rx="2" opacity=".6" />
        <rect x="68" y="22" width="10" height="10" rx="2" opacity=".4" />
      </g>
      <path d="M6 14 H88" stroke="#6f7077" strokeWidth="1.5" strokeDasharray="3 4" />
    </svg>
  ),
  trigger: (
    <svg viewBox="0 0 96 36" aria-hidden="true">
      <path d="M4 28 L22 22 L38 26 L56 14 L72 18 L92 8" stroke="#a3a4ab" strokeWidth="2" fill="none" />
      <path d="M4 14 H92" stroke="#f0b429" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="56" cy="14" r="4" fill="#f0b429" />
    </svg>
  ),
  trailing: (
    <svg viewBox="0 0 96 36" aria-hidden="true">
      <path d="M4 30 L24 22 L40 16 L58 8 L72 14 L90 24" stroke="#34d399" strokeWidth="2" fill="none" />
      <path d="M4 34 L24 28 L40 22 L58 14 L90 14" stroke="#fb6a78" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
    </svg>
  ),
  arb: (
    <svg viewBox="0 0 96 36" aria-hidden="true">
      <path d="M4 26 C30 26 30 10 48 10" stroke="#f0b429" strokeWidth="2" fill="none" />
      <path d="M48 10 C66 10 66 26 92 26" stroke="#34d399" strokeWidth="2" fill="none" />
      <circle cx="48" cy="10" r="3" fill="#f0b429" />
    </svg>
  ),
  swap: (
    <svg viewBox="0 0 96 36" aria-hidden="true">
      <path d="M10 12 H70 m-8 -6 l8 6 l-8 6" stroke="#f0b429" strokeWidth="2" fill="none" />
      <path d="M86 24 H26 m8 -6 l-8 6 l8 6" stroke="#34d399" strokeWidth="2" fill="none" />
    </svg>
  ),
};

export function Plans() {
  return (
    <section className="sf-section">
      <div className="sf-eyebrow">Plans</div>
      <h2>Tell it what to do.</h2>
      <p className="sf-lead">Each agent runs one plan at a time, so you always know what it&apos;s doing.</p>
      <div className="sf-plans">
        {PLANS.map((p) => (
          <div key={p.id} className="sf-plan">
            <h3>{p.title}</h3>
            {ICONS[p.id]}
            <p className="sf-what">{p.what}</p>
            <div className="sf-meta">
              {p.chips.map((c) => (
                <span key={c} className="sf-chip">
                  {c}
                </span>
              ))}
              {p.brain && <span className="sf-chip sf-chip-gold">◆ brain available</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create the can't-do section**

`app/strategyforge/_sections/CantDo.tsx`:

```tsx
import { Lock, X } from "lucide-react";
import { SECURITY_URL } from "../content";

const ROWS = [
  { title: "Trade outside your plan", body: "It runs only the plan you picked, one plan per agent." },
  {
    title: "Change your size or loss limits",
    body: "Not the agent, and not the brain. The brain tunes spread and pacing inside them.",
  },
  {
    title: "Keep going when something breaks",
    body: "If a venue misbehaves or prices look wrong, it halts and waits for you to resume.",
  },
  { title: "Let our staff read its keys", body: "They're sealed in the enclave. Nobody on our team can see them." },
];

export function CantDo() {
  return (
    <section className="sf-section">
      <div className="sf-cant">
        <div>
          <div className="sf-eyebrow">Safety</div>
          <h2>
            What your agent
            <br /> <span className="sf-gold">can&apos;t</span> do.
          </h2>
          <p className="sf-lead">The limits are enforced in code, not by asking the AI nicely.</p>
          <div className="sf-seal">
            <div className="sf-ring">
              <div>
                <Lock aria-hidden="true" />
              </div>
            </div>
            <p>Keys never leave a hardware enclave. The enclave only unlocks them for approved code.</p>
            <a className="sf-link" href={SECURITY_URL}>
              How we protect your keys →
            </a>
          </div>
        </div>
        <ul className="sf-list">
          {ROWS.map((r) => (
            <li key={r.title} className="sf-row">
              <div className="sf-x" aria-hidden="true">
                <X strokeWidth={2.5} />
              </div>
              <div>
                <b>{r.title}</b>
                <span>{r.body}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create the venues section**

`app/strategyforge/_sections/Venues.tsx`:

```tsx
import { VENUES } from "../content";

export function Venues() {
  return (
    <section className="sf-section">
      <div className="sf-eyebrow">Where it trades</div>
      <h2>Live on Canton&apos;s venues.</h2>
      <p className="sf-lead">Your agent trades directly on these venues. More are coming.</p>
      <div className="sf-vgrid">
        {VENUES.map((v) => (
          <div key={v.name} className="sf-v" data-venue-card={v.name}>
            <div className="sf-top">
              <h3>{v.name}</h3>
              <span className="sf-live">
                <i className="sf-dot" aria-hidden="true" />
                Live
              </span>
            </div>
            <p>{v.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create the FAQ**

`app/strategyforge/_sections/Faq.tsx`:

```tsx
const FAQ = [
  {
    q: "Who can see my agent's keys?",
    a: "Nobody on our team. They're sealed in a hardware enclave that only unlocks them for approved code.",
  },
  {
    q: "What does the brain actually do?",
    a: "On market-making plans you switch it on per plan. It tunes spread and pacing within your limits, never your size or loss limits, and logs a reason for every change.",
  },
  { q: "What if something goes wrong?", a: "The agent halts and tells you. It stays halted until you resume it." },
  { q: "Do I need to run anything?", a: "No. Everything runs for you." },
  { q: "Is it available now?", a: "We're in a pilot. Join and we'll let you in as places open." },
];

export function Faq() {
  return (
    <section className="sf-section">
      <div className="sf-eyebrow">Questions</div>
      <h2>Common questions.</h2>
      <div className="sf-faq">
        {FAQ.map((f, i) => (
          <details key={f.q} open={i < 3}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create the join form**

`app/strategyforge/_sections/JoinForm.tsx`:

```tsx
import { FORMSPREE_ID } from "../content";

// Plain HTML POST (works without JS). Formspree redirects to _next; SuccessBanner reads ?success=true.
export function JoinForm() {
  return (
    <section id="join" className="sf-section">
      <div className="sf-final">
        <div className="sf-eyebrow">Pilot</div>
        <h2>Put an agent to work.</h2>
        <p className="sf-lead">Join the pilot. We&apos;ll email you when your spot opens.</p>
        <form action={`https://formspree.io/f/${FORMSPREE_ID}`} method="POST" className="sf-email">
          <input type="hidden" name="_next" value="https://qasara.ai/strategyforge?success=true" />
          <input type="hidden" name="_subject" value="StrategyForge — pilot waitlist" />
          <input type="hidden" name="product" value="strategyforge" />
          <input type="hidden" name="source" value="sf-page-v2" />
          <label htmlFor="sf-join-email" className="sf-sr-only">
            Email
          </label>
          <input
            id="sf-join-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
          />
          <button type="submit" className="sf-btn sf-btn-sm">
            Join the pilot
          </button>
        </form>
      </div>
      <p className="sf-risk">
        StrategyForge is software. Nothing here is financial advice. Automated trading carries risk.
      </p>
    </section>
  );
}
```

- [ ] **Step 6: Rewrite the success banner**

Replace the whole of `app/strategyforge/SuccessBanner.tsx` with:

```tsx
"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

// Rendered at the top of the page: Formspree lands the user there after submitting.
export function SuccessBanner() {
  const params = useSearchParams();
  if (params.get("success") !== "true") return null;

  return (
    <div className="sf-success-wrap">
      <div role="status" aria-live="polite" className="sf-success">
        <CheckCircle2 strokeWidth={1.75} aria-hidden="true" />
        <p>You&apos;re on the list. We&apos;ll email you when your spot opens.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Add the sections to the page**

In `app/strategyforge/page.tsx`, replace the section imports with:

```tsx
import { CantDo } from "./_sections/CantDo";
import { Faq } from "./_sections/Faq";
import { Hero } from "./_sections/Hero";
import { HowItWorks } from "./_sections/HowItWorks";
import { JoinForm } from "./_sections/JoinForm";
import { Pillars } from "./_sections/Pillars";
import { Plans } from "./_sections/Plans";
import { Venues } from "./_sections/Venues";
```

and replace `<HowItWorks />` in the JSX with:

```tsx
      <HowItWorks />
      <Plans />
      <CantDo />
      <Venues />
      <Faq />
      <JoinForm />
```

- [ ] **Step 8: Build and run the guard**

Run: `npm run build 2>&1 | tail -25 && npm run check:sf 2>&1 | grep -E "FAIL|checks pass"`
Expected: every check passes except the three `home card` checks.

- [ ] **Step 9: Commit**

```bash
git add app/strategyforge/_sections app/strategyforge/SuccessBanner.tsx app/strategyforge/page.tsx
git commit -m "feat(strategyforge): page v2 plans, safety, venues, FAQ and pilot waitlist"
```

---

### Task 4: Home card

**Files:**
- Modify: `app/page.tsx:91-94`

**Interfaces:**
- Consumes: nothing new.
- Produces: home card copy the guard checks.

The spec §6 names only the description. The CTA "Request Early Access" and badge "Early Access" would contradict the page (the guard bans "early access" on the page, and the CTA ruling is "Join the pilot"), so they change with it.

- [ ] **Step 1: Edit the card**

In `app/page.tsx`, replace:

```tsx
                description="Non-custodial automated trading strategies on Canton venues. Your strategies, your accounts — your keys never leave your control."
                href="/strategyforge"
                cta="Request Early Access"
                badge={{ label: "Early Access", tone: "teal" }}
```

with:

```tsx
                description="Your trading agent on Canton: sealed keys, a brain, and limits you set."
                href="/strategyforge"
                cta="Join the pilot"
                badge={{ label: "Pilot", tone: "teal" }}
```

- [ ] **Step 2: Check nothing else on the site still sells the old StrategyForge**

Run: `grep -rn -i "non-custodial\|never leave your control\|sidecar" app components --include=*.tsx | grep -i -v "cove\|bridge" | head`
Expected: no StrategyForge hits. If a hit is StrategyForge copy outside this page (for example `app/layout.tsx` or `public/llms.txt` describing the sidecar), do not edit it; list it in the Task 5 report for Anand.

- [ ] **Step 3: Build and run the guard**

Run: `npm run build 2>&1 | tail -25 && npm run check:sf 2>&1 | grep -E "FAIL|checks pass"`
Expected: `N/N checks pass`, exit 0.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): StrategyForge card points at the agent and the pilot"
```

---

### Task 5: Verify (flags off, screenshots, links) and ship-gate report

**Files:**
- No source changes, except fixes found here (each fix gets its own commit).
- Screenshots and scratch scripts go to the session scratchpad, never the repo.

- [ ] **Step 1: Flags-off build**

Edit `app/strategyforge/content.ts`: set `SHOW_ARB = false` and `SHOW_STEADY_SWAP = false`.
Run: `npm run build 2>&1 | tail -5 && npm run check:sf 2>&1 | grep -E "FAIL|checks pass|pills|cards"`
Expected: all checks pass, pills and cards are `Temple` only. Then set only `SHOW_STEADY_SWAP = true`, rebuild and rerun: expected pills/cards `Temple, Tradecraft`, all pass.
Restore: `git checkout -- app/strategyforge/content.ts && git diff --stat` (expected: empty).

- [ ] **Step 2: Lint**

The repo has no ESLint config or `eslint` dependency, so `next lint` would prompt to install one. Do not install anything. Record "lint: not configured in repo; `next build` type check is the gate" in the report.

- [ ] **Step 3: Serve the production build**

Run: `npm run build 2>&1 | tail -3`, then check the port is free: `netstat -ano | grep -c ":3107 "` (expected `0`). Start `npx next start -p 3107` in the background and wait until `curl -s -o /dev/null -w "%{http_code}" http://localhost:3107/strategyforge` prints `200`.

- [ ] **Step 4: Screenshots**

Set `SP` to the session scratchpad and `EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"`.

Desktop full page and the two viewport checks:

```bash
"$EDGE" --headless=new --disable-gpu --hide-scrollbars --window-size=1280,6000 --screenshot="$SP/sf-1280.png" http://localhost:3107/strategyforge
"$EDGE" --headless=new --disable-gpu --hide-scrollbars --window-size=1280,900 --screenshot="$SP/sf-success.png" "http://localhost:3107/strategyforge?success=true"
"$EDGE" --headless=new --disable-gpu --hide-scrollbars --window-size=1280,900 --screenshot="$SP/sf-how.png" "http://localhost:3107/strategyforge#how"
```

Phone width: headless Edge has a minimum window width, so render the page in a 390px iframe. Write `$SP/m390.html`:

```html
<!doctype html><html><body style="margin:0;background:#000">
<iframe src="http://localhost:3107/strategyforge" style="width:390px;height:9000px;border:0;display:block"></iframe>
</body></html>
```

then:

```bash
"$EDGE" --headless=new --disable-gpu --hide-scrollbars --window-size=600,9000 --virtual-time-budget=8000 --screenshot="$SP/sf-390-raw.png" "file:///$(cygpath -m "$SP")/m390.html"
python -I -c "
from PIL import Image, ImageChops
import sys
for src, dst, w in [(sys.argv[1]+'/sf-1280.png', sys.argv[1]+'/sf-1280.png', 1280), (sys.argv[1]+'/sf-390-raw.png', sys.argv[1]+'/sf-390.png', 390)]:
    im = Image.open(src).convert('RGB').crop((0, 0, w, Image.open(src).height))
    bg = Image.new('RGB', im.size, im.getpixel((w - 1, im.height - 1)))
    box = ImageChops.difference(im, bg).getbbox()
    im.crop((0, 0, w, box[3] + 8 if box else im.height)).save(dst)
    print(dst, im.size)
" "$(cygpath -m "$SP")"
```

Read `sf-1280.png`, `sf-390.png`, `sf-success.png` and `sf-how.png`. Pass when:
- 1280: matches the mockup layout; gold H1 word; agent card right of the hero text; every section visible.
- 390: single column, 16px gutters, nothing cut off at the right edge, the email form stacked (input above button), steps readable.
- success: the green "You're on the list" banner shows below the nav without scrolling.
- how: the "How it works" eyebrow and "Live in four steps." sit below the sticky nav, not under it.

If 390 shows content cut at the right edge, find the element (usually a fixed width or a long unbroken string), fix it in `sf-theme.css`, rebuild, reshoot, commit `fix(strategyforge): ...`.

- [ ] **Step 5: Link and form checks**

```bash
curl -s http://localhost:3107/strategyforge | grep -o 'href="#[a-z]*"\|id="how"\|id="join"' | sort | uniq -c
curl -s -o /dev/null -w "%{http_code}\n" https://strategyforge.qasara.ai/security
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3107/
```

Expected: `href="#how"`, `href="#join"`, `id="how"`, `id="join"` each present; `/security` returns 200 (if it redirects to a login page, note it as ship-gate item 5 failing); home returns 200. Do not submit the real form (it emails Anand's inbox); the guard already pins the action, method and hidden fields.

Stop the server (kill the `next start` process) and confirm the port is free again.

- [ ] **Step 6: Final copy read**

Run: `npm run check:sf 2>&1 | tail -1` (expected all pass), then read the page text once against spec §7: `node -e "const h=require('fs').readFileSync('.next/server/app/strategyforge.html','utf8');const s=h.indexOf('class=\"sf-theme');const e=h.indexOf('<footer',s);console.log(h.slice(s,e).replace(/<[^>]+>/g,' ').replace(/&#x27;/g,\"'\").replace(/\s+/g,' '))" > "$SP/sf-text.txt"` and read `sf-text.txt`. Every sentence must trace to a spec §3 line.

- [ ] **Step 7: Ship-gate report (no deploy)**

Run `ssh qasara-strategyforge sfstate --all 2>&1 | grep -i -E "arb|random_swap|swap|cantex|tradecraft|brain" | head -30` (read-only). Write the report for Anand to the session scratchpad `sf-page-v2-report.md` with:
- Commits on local main since `636afd7` (`git log --oneline 636afd7..HEAD`).
- Guard result, flags-off result, screenshot paths.
- Spec §8 gate items 1-6, each PASS / FAIL / NEEDS ANAND with the sfstate line as evidence. Item 2 (`strategyforge/apps/web/src/copy/venues.ts:15` still says "Tradecraft is coming soon"): check with `grep -n "coming soon" ../strategyforge/apps/web/src/copy/venues.ts` after `git -C ../strategyforge fetch -q origin main` and reading `origin/main`'s copy via `git -C ../strategyforge show origin/main:apps/web/src/copy/venues.ts | grep -n "coming soon"`.
- The values `SHOW_ARB` and `SHOW_STEADY_SWAP` should take given sfstate. Do not change them in this task; Anand rules on ship day.
- Any StrategyForge copy found elsewhere on the site in Task 4 Step 2.

Do not push. Do not deploy.

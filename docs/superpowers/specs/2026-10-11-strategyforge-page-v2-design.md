# StrategyForge Page v2 on qasara.ai — Design

Date: 2026-10-11. Supersedes [2026-07-22-strategyforge-page-design.md](2026-07-22-strategyforge-page-design.md)
for page content, theme and lead capture. Approved mockup:
`.superpowers/brainstorm/5885-1791719971/content/full-page.html` (look A).

## 1. Goal and audience

The July page sells a self-hosted sidecar running one grid MM bot. The product today is a
hosted trading agent: its own wallet with the key sealed in an enclave, a brain that reviews
its plan, and hard limits. The page must sell that product.

- Primary reader: individual crypto traders on Canton (ruling 2026-10-11).
- Success: a trader understands in ~10 seconds what the agent is, why it is safe and how to
  start; moving from the page into the app feels like the same product; no sentence on the
  page is false on the day it ships.

## 2. Rulings (2026-10-11, Anand)

| Decision | Why | Cost if wrong |
|---|---|---|
| Hero noun is the agent: wallet + brain + rules | Matches the product; rules are the differentiator vs "AI bot" hype | Re-copy |
| Look A: StrategyForge sub-brand (app's graphite + molten gold, Onest + JetBrains Mono) inside the Qasara nav/footer | Site-to-app continuity; sets SF apart from Cove/Bridge | Re-theme one page |
| CTA is "Join the pilot" (email waitlist) now; flips to "Start your agent" -> app `/signup` at self-serve go-live | Don't send strangers into a pilot | One-line change later |
| No "non-custodial" label. Describe what is true, link to the app's `/security` page | Hosted enclave wallet; legal risk of the label | Weaker headline claim |
| No pricing section | Anand: not on this page | None |
| No desks/builders section (sidecar, MCP, x402) | Anand: not enabled for now | Lost secondary leads |
| Temple, Tradecraft and Cantex all shown live | Anand: Tradecraft and Cantex go live 2026-10-11 | False claim if go-live slips; see ship gate §8 |
| Lead with "sealed keys" (generic), not "its own wallet"; "own wallet" only on swap/arb plan cards | §7 check: Temple plans trade the user's own Temple account | Weaker hook |
| Don't mention the Temple API key anywhere on the page | Anand: not needed on the website | Users learn it at onboarding |
| Only claims marked yes in §7 appear; withdrawal, "nobody incl. us" and Loop funding claims are dropped | §7 check | None |

## 3. Page structure (top to bottom)

Layout and look are the approved mockup. Copy below is the post-§7 version (the mockup's
wallet, withdrawal, ladder, rebalancer and Loop lines were false and are replaced).

1. **Hero.** Eyebrow "StrategyForge · on Canton". H1 "Your trading agent on Canton." (gold
   gradient on "Canton."). Sub: "It trades for you on Temple, Tradecraft and Cantex, inside
   limits you set. Its keys are sealed in a hardware enclave." Buttons: "Join the pilot"
   (scrolls to §3.7 form), "See how it works →" (anchor to §3.3). Venue pills: Temple,
   Tradecraft, Cantex with live dots. Right side: static agent card (name, Running, value,
   weekly P&L, plan "Earn the spread", max position, loss limit, latest brain note "Volatility
   doubled in the last hour. Widened the spread band from 0.4% to 0.6%.", footer "Keys sealed
   in a hardware enclave"). Card numbers are illustrative; the card carries an "Example" label.
2. **Pillars.** H2 "An agent you can actually trust with money." Three cards:
   - Sealed keys: "Your agent's keys live inside a hardware enclave. Our staff can't read
     them, and only approved enclave code can use them."
   - A brain: "On market-making plans, the brain watches the market and tunes your spread and
     pacing. It never touches your size or loss limits, and it tells you why for every
     change." Mini line: "market-making plans · switch it on per plan".
   - Your rules: "You pick the plan and set the limits. It halts itself when something looks
     wrong and waits for you. Pause or stop any time."
3. **How it works** (`id="how"`). "Live in four steps.": Create your agent; Connect your
   venue account ("Link the venue you trade on. Takes a minute."); Pick a plan and set limits;
   Watch it work ("See every trade and every brain decision. Pause, change or stop any time.").
   No "fund from Loop" and no API-key wording.
4. **Plans.** "Tell it what to do." Lead: "Each agent runs one plan at a time, so you always
   know what it's doing." Cards (inline SVG + venue chips):
   - Earn the spread (market making, Temple; "brain available" chip)
   - Buy a bit at a time (DCA, Temple)
   - Buy or sell at your price (price trigger / entry-exit, Temple)
   - Protect your gains (trailing stop, Temple)
   - Catch price gaps (arbitrage, Cantex ↔ Tradecraft; "its own wallet" chip) — shown only if
     arb is merged, deployed and open to pilot users on ship day; otherwise omitted.
   - Steady swap (Tradecraft) — shown only if SF_RANDOM_SWAP_ENABLED is on in prod (sfstate).
5. **What your agent can't do.** Four rows: Trade outside your plan; Change your size or loss
   limits (the brain can't either); Keep going when something breaks (halts and waits for
   you); Let our staff read its keys. Plus an enclave panel ("Keys never leave a hardware
   enclave. The enclave only unlocks them for approved code.") linking to
   `https://strategyforge.qasara.ai/security` ("How we protect your keys →"; the route is
   public per the app router; confirm it loads logged out before ship).
6. **Venues.** Temple ("Order book exchange. Market making, DCA, price triggers and trailing
   stops."), Tradecraft ("AMM swap pools. Swaps and price-gap trades."), Cantex ("AMM swap
   pools. Price-gap trades.") with live badges. Venue blurbs list only plans shown in §3.4.
   No funding line.
7. **FAQ + join.** Five questions:
   - "Who can see my agent's keys?" Nobody on our team. They're sealed in a hardware enclave
     that only unlocks them for approved code.
   - "What does the brain actually do?" On market-making plans you switch it on per plan. It
     tunes spread and pacing within your limits, never your size or loss limits, and logs a
     reason for every change.
   - "What if something goes wrong?" The agent halts and tells you. It stays halted until you
     resume it.
   - "Do I need to run anything?" No. Everything runs for you.
   - "Is it available now?" We're in a pilot. Join and we'll let you in as places open.
   Then the final "Put an agent to work." block with the email form, then the risk line
   "StrategyForge is software. Nothing here is financial advice. Automated trading carries
   risk."

FAQ is built with native `<details>` (no JS). No self-hosting, pricing, MCP or x402 mention
anywhere on the page.

## 4. Theme

Scoped to the page body; Nav and Footer keep the Qasara look.

- Tokens copied from `strategyforge/apps/web/src/styles/tokens.css` (dark values only) into a
  page-scoped CSS block (`.sf-theme` wrapper with CSS variables): bg `#0b0b0c`, surface
  `#161618`, surface-2 `#1c1c1f`, border `#2b2b2f`, ink `#e9eaed`, muted `#a3a4ab`, gold
  `#f0b429`, gold-hot `#ffd96b`, gold-deep `#b8770c`, pos `#34d399`, neg `#fb6a78`.
- Fonts: Onest (400-700) and JetBrains Mono (400, 500) via `next/font/google`, applied only
  inside `.sf-theme`. Numbers use mono with tabular figures.
- Gold button (gradient + glow), faint grid + gold radial glow behind the hero, as in the
  mockup. No new npm dependencies (next/font is built in).
- Mobile: single column below 860px, 16px gutters, no horizontal scroll; check at 390px.

## 5. Lead capture

Replace the long early-access form with an email-only waitlist on the same Formspree
endpoint (`meedknag`). Hidden fields: `_subject` "StrategyForge — pilot waitlist",
`product` "strategyforge", `source` "sf-page-v2", `_next`
`https://qasara.ai/strategyforge?success=true`. Keep `SuccessBanner` with copy "You're on the
list. We'll email you when your spot opens." The hero button scrolls to this form.

## 6. Site wiring

- `app/strategyforge/page.tsx`: rewritten. Split into small section components under
  `app/strategyforge/_sections/` (Hero, AgentCard, Pillars, HowItWorks, Plans, CantDo,
  Venues, Faq, JoinForm) so each stays small.
- `app/page.tsx:91` home card description: replace the "keys never leave your control"
  line with "Your trading agent on Canton: sealed keys, a brain, and limits you set."
- Page metadata: title "StrategyForge: your trading agent on Canton"; description from the
  hero sub; OpenGraph title/description to match.
- Header "Get API Access" button: unchanged (site-wide, not this page's scope).

## 7. Claim checks (Assumptions)

The page states only rows marked yes, and the §3 copy is written from them. Rows marked
FALSE or PARTLY explain why the mockup copy was changed. Source = code anchor or canton-agent knowledge file.

| # | Claim | Source | Verified |
|---|---|---|---|
| A1 | Temple is an order book (CLOB) | canton-agent/knowledge/venues/temple.md:1 | yes |
| A2 | Tradecraft is AMM swap pools | canton-agent/knowledge/venues/tradecraft.md:1 | yes |
| A3 | Cantex is AMM swap pools (CaviarNine) | canton-agent/knowledge/venues/cantex.md (title) | yes |
| A4 | Agent key is born and sealed in the enclave | strategyforge walletBirth.ts:1-6, feeWalletBirth.ts:192 | yes |
| A5 | "Nobody can copy it out, including us" | Qasara keeps kms:PutKeyPolicy and can pin a new image (pilot-lane-c-live.sh:373-378) | FALSE as worded |
| A6 | KMS decrypt only for the pinned image (PCR0) | kms.ts:1-7 | yes, but PCR0 not published yet (securityFacts.ts:21), so users can't check it |
| A7 | "Can't send your funds to anyone else; withdrawals go back to you" | walletWithdraw.ts:49,73: any party with a USDXLR preapproval; no user signature in the enclave, daily cap only (walletCaps.ts:137); fees go to a Qasara party (feePay.ts:148-154) | FALSE |
| A8 | "Withdraw any time" | USDXLR only, not CC (walletWithdraw.ts:52); refused while a swap plan/swap is open (:82-84); one at a time; daily cap | PARTLY |
| A9 | Brain adjusts within limits, explains, logs | MM plans only; off by default per plan (0089); applies changes itself; tunes spread band, skew, requote, trend, 1-120 min side pause; never size/position/loss limits (apply.ts, mmAdapter.ts:21-29); each change has a reason (types.ts:82) | PARTLY |
| A10 | Hard limits | maxPositionCc, maxOrderCc, maxDailyTradedCc, priceBand, lossLimitUsdcx, endsAt (planSchema.ts:27-62); enforced by the platform, not the enclave | PARTLY |
| A11 | Halts until the user resumes | no auto-resume found (except the brain's timed pause) | yes |
| A12 | One live plan per agent | hosted_plans_one_live_uq (0091) | yes |
| A13 | "Fund it from Loop or any Canton wallet" | deposits off by default (SF_HOSTED_DEPOSITS_ENABLED); no Loop path tested; Temple MM uses the user's own Temple account, not the agent wallet | FALSE today |
| A14 | Plans: spread, price gaps, ladder, rebalancer | main has MM, entry/exit, DCA, price trigger, trailing stop (Temple) and Steady Swap (Tradecraft, flag). No ladder, no rebalancer. Arb is Cantex<->Tradecraft only, unmerged, flag + allowlist (sf-arb-t arbCreate.ts:26) | FALSE as drawn |
| A15 | "Nothing to run, no keys to manage" | true for servers; Temple plans need the user's Temple API key sealed via the key page (hostedVenueCredential.ts:1-11) | PARTLY |

Full evidence: session scratchpad `claims-check.md` (checked against strategyforge main
1452eb11 and sf-arb-t 7ef3744f). Live flag states were not checked; sfstate before ship.

## 8. Ship gate

The page ships only when all of these hold:

1. sfstate shows Tradecraft and Cantex live, and the Cantex arb code is merged and deployed
   from main.
2. The app's own copy agrees (`strategyforge/apps/web/src/copy/venues.ts:15` no longer says
   "Tradecraft is coming soon").
3. Page copy uses only §7 rows marked yes; a final read of the built page against §7.
4. sfstate confirms the flags behind any optional plan card (arb, Steady Swap) and that brain
   review can be switched on for pilot MM plans.
5. `https://strategyforge.qasara.ai/security` loads logged out.
6. A venue appears in the hero pills and §3.6 only if at least one plan card shown in §3.4
   runs on it. Cantex depends on arb; Tradecraft depends on arb or Steady Swap.

Later, not blocking: publish PCR0 on /security and lock withdrawals to an owner-set
destination (memory: project_withdraw_destination_gap). Once both ship, the page can add
"check the enclave yourself" and "funds only go back to you".

## 9. Testing / acceptance

- `next build` and lint pass (repo has no test suite).
- Screenshots at 1280 and 390 of the full page; read them before calling it done.
- Manual: form posts with hidden fields; `?success=true` shows the banner; hero button
  scrolls to the form; "See how it works" anchors; `/security` link resolves; nav and home
  card link correctly.
- Copy read against §7: no "non-custodial", no pricing, no self-hosting, no Temple API key,
  no withdrawal or funding promises.
- Low risk (marketing copy and UI): no mutants; one diff review.
- Git identity for this repo: `anand@qasara.ai`. Deploy is Anand's.

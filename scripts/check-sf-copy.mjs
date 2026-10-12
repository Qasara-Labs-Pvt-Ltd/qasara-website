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

// Theme CSS: one top-level rule per selector, so two components never share a class by accident.
const themeCss = readFileSync("app/strategyforge/sf-theme.css", "utf8").split(/@media/)[0];
// Grouped rules (a, b {}) are shared on purpose, so only single-selector rules count.
const selectors = [...themeCss.matchAll(/^([^{}\n@,][^{}\n,]*)\{/gm)].map((m) => m[1].trim());
const dupes = selectors.filter((s, i) => selectors.indexOf(s) !== i);
check(`no duplicate theme selectors${dupes.length ? ` (${dupes.join("; ")})` : ""}`, dupes.length === 0);

const failed = checks.filter(([, ok]) => !ok);
for (const [name, ok] of checks) console.log(`${ok ? "ok  " : "FAIL"} ${name}`);
console.log(`\n${checks.length - failed.length}/${checks.length} checks pass`);
process.exit(failed.length ? 1 : 0);

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

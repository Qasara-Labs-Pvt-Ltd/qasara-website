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

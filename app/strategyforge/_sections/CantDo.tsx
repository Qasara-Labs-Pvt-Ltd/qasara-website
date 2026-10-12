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

import { FORMSPREE_ID } from "../content";
import { PilotEmailForm } from "./PilotEmailForm";

// The form posts to Formspree; PilotEmailForm thanks the visitor in place (plain POST without JS).
export function JoinForm() {
  return (
    <section id="join" className="sf-section">
      <div className="sf-final">
        <div className="sf-eyebrow">Pilot</div>
        <h2>Put an agent to work.</h2>
        <p className="sf-lead">Join the pilot. We&apos;ll email you when your spot opens.</p>
        <PilotEmailForm action={`https://formspree.io/f/${FORMSPREE_ID}`} />
      </div>
      <p className="sf-risk">
        StrategyForge is software. Nothing here is financial advice. Automated trading carries risk.
      </p>
    </section>
  );
}

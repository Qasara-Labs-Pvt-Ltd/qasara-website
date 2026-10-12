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

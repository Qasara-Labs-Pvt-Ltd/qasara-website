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

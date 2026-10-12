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

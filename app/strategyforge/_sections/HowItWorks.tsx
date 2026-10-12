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

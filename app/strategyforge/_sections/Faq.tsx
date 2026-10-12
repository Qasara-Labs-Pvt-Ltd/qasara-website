const FAQ = [
  {
    q: "Who can see my agent's keys?",
    a: "Nobody on our team. They're sealed in a hardware enclave that only unlocks them for approved code.",
  },
  {
    q: "What does the brain actually do?",
    a: "On market-making plans you switch it on per plan. It tunes spread and pacing within your limits, never your size or loss limits, and logs a reason for every change.",
  },
  { q: "What if something goes wrong?", a: "The agent halts and tells you. It stays halted until you resume it." },
  { q: "Do I need to run anything?", a: "No. Everything runs for you." },
  { q: "Is it available now?", a: "We're in a pilot. Join and we'll let you in as places open." },
];

export function Faq() {
  return (
    <section className="sf-section">
      <div className="sf-eyebrow">Questions</div>
      <h2>Common questions.</h2>
      <div className="sf-faq">
        {FAQ.map((f, i) => (
          <details key={f.q} open={i < 3}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

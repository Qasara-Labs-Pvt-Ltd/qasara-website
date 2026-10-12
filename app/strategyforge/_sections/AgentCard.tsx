import { Lock } from "lucide-react";

// Static illustration (spec §3.1). Numbers are made up; the "Example" label says so.
export function AgentCard() {
  return (
    <div className="sf-acard">
      <div className="sf-example">Example</div>
      <div className="sf-crow">
        <div className="sf-an">
          <div className="sf-av" aria-hidden="true">
            A
          </div>
          Atlas
        </div>
        <div className="sf-st">
          <i className="sf-dot" aria-hidden="true" />
          Running
        </div>
      </div>
      <div className="sf-bal sf-mono">
        2,431.20 <span className="sf-bal-unit">CC</span>
      </div>
      <div className="sf-pnl sf-mono">+38.70 CC this week</div>
      <div className="sf-g3">
        <Cell k="Plan" v="Earn the spread" />
        <Cell k="Max position" v="3,000 CC" mono />
        <Cell k="Loss limit" v="150 USDCx" mono />
      </div>
      <div className="sf-brain">
        <div className="sf-k">◆ Brain · 2 min ago</div>
        Volatility doubled in the last hour. Widened the spread band from 0.4% to 0.6%.
      </div>
      <div className="sf-card-foot">
        <Lock aria-hidden="true" />
        Keys sealed in a hardware enclave
      </div>
    </div>
  );
}

function Cell({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="sf-cell">
      <div className="sf-k">{k}</div>
      <div className={mono ? "sf-v sf-mono" : "sf-v"}>{v}</div>
    </div>
  );
}

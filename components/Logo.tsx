import Link from "next/link";

export function Logo({ withWordmark = true }: { withWordmark?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5"
      aria-label="Qasara — home"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 group-hover:rotate-[60deg]"
      >
        <path
          d="M60 10 L105 32 L105 88 L60 110 L15 88 L15 32 Z"
          stroke="url(#logoGrad)"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M60 28 L88 44 L88 76 L60 92 L32 76 L32 44 Z"
          stroke="url(#logoGrad)"
          strokeWidth="3"
          fill="rgba(0,212,170,0.06)"
        />
        <circle cx="60" cy="60" r="10" fill="url(#logoGrad)" />
        <defs>
          <linearGradient id="logoGrad" x1="15" y1="10" x2="105" y2="110">
            <stop offset="0%" stopColor="#00d4aa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      {withWordmark && (
        <span className="text-[17px] font-semibold tracking-tight">
          <span className="qmark">Q</span>
          <span className="text-ink">asara</span>
        </span>
      )}
    </Link>
  );
}

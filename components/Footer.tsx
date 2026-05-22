import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

const internalLinks = [
  { href: "/cove", label: "Cove" },
  { href: "/bridge", label: "Bridge" },
  { href: "/contact", label: "Contact" },
];

const externalLinks = [
  { href: "https://canton.network", label: "canton.network" },
  { href: "https://docs.sync.global", label: "docs.sync.global" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-line bg-bg-subtle">
      <div className="grain pointer-events-none absolute inset-0 opacity-30" />
      <div className="container-page relative py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              Where Canton Flows.
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-dim">
              Building the infrastructure layer for the institutional Canton
              Network era.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-5">
              <span>Products</span>
            </div>
            <ul className="flex flex-col gap-3">
              {internalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-muted transition hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-5">
              <span>Ecosystem</span>
            </div>
            <ul className="flex flex-col gap-3">
              {externalLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition hover:text-ink"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-xs text-ink-dim md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 Qasara Labs Pvt Ltd · admin@qasara.ai · Built on Canton Network
          </p>
          <p className="max-w-md md:text-right">
            Qasara is an independent operator on Canton Network. Canton Network
            and Canton Coin are trademarks of Digital Asset Holdings LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}

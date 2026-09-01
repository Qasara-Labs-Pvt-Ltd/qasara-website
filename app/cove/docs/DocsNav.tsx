"use client";

import { useEffect, useRef, useState } from "react";

export type DocsNavItem = { id: string; n: string; label: string };

/**
 * Sidebar contents with scroll-spy. Sections here vary enormously in height
 * (Transfers is many screens, System is half of one), so the active item is the
 * last section whose top has passed a reading line just under the sticky header
 * — not an intersection ratio, which would flicker on the tall ones and never
 * fire on the short ones.
 */
export function DocsNav({ items }: { items: DocsNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (items.length === 0) return;
    const LINE = 140; // sticky nav (64) + breathing room

    let frame = 0;
    const compute = () => {
      frame = 0;
      const doc = document.documentElement;

      // At the very bottom the final section may be too short to reach the
      // line, so nothing below it could ever highlight. Give it the win.
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
        setActive(items[items.length - 1].id);
        return;
      }

      let current = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top > LINE) break;
        current = item.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  // Keep the highlighted entry inside the nav's own scroll box. Adjusting
  // scrollTop directly rather than scrollIntoView, which would also drag the
  // page (and smoothly, given the global scroll-behavior).
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || nav.scrollHeight <= nav.clientHeight) return;
    const link = nav.querySelector<HTMLElement>(`[data-nav-id="${active}"]`);
    if (!link) return;
    const navBox = nav.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    if (linkBox.top < navBox.top || linkBox.bottom > navBox.bottom) {
      nav.scrollTop +=
        linkBox.top - navBox.top - (navBox.height - linkBox.height) / 2;
    }
  }, [active]);

  return (
    <nav
      ref={navRef}
      className="rounded-xl border border-line bg-bg-card/50 p-4 lg:max-h-[70vh] lg:overflow-y-auto"
    >
      <ol className="space-y-1">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-nav-id={item.id}
                aria-current={isActive ? "location" : undefined}
                className={`group relative flex gap-3 rounded px-2 py-1.5 text-[13.5px] transition-colors duration-200 ${
                  isActive
                    ? "bg-brand-teal/[0.08] text-ink"
                    : "text-ink-muted hover:bg-bg-elevated hover:text-ink"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-1 left-0 w-0.5 rounded-full bg-brand-mint transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <span
                  className={`font-mono transition-colors ${
                    isActive
                      ? "text-brand-mint"
                      : "text-ink-dim group-hover:text-brand-mint"
                  }`}
                >
                  {item.n}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "/cove", label: "Cove" },
  { href: "/bridge", label: "Bridge" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-line/80 bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-bg/0"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                data-active={pathname.startsWith(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/contact" className="btn-primary">
              Get API Access
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition hover:border-ink-muted/60 hover:text-ink"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-bg/95 backdrop-blur-xl" />
        <div className="relative flex h-full flex-col">
          <div className="container-page flex h-16 items-center justify-between border-b border-line">
            <Logo />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="container-page flex flex-1 flex-col justify-between py-14">
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between border-b border-line/60 py-5 text-3xl font-semibold tracking-tight"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-5 w-5 text-ink-muted transition group-hover:text-brand-teal" />
                </Link>
              ))}
            </nav>
            <Link href="/contact" className="btn-primary w-full justify-center">
              Get API Access
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

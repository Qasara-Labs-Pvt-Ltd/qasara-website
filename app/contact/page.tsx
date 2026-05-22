import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Globe, Network, Send } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { Reveal } from "@/components/Reveal";
import { SuccessBanner } from "./SuccessBanner";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Qasara for Cove API access, Canton Bridge enquiries, partnerships, and Canton ecosystem questions.",
};

const FORMSPREE_ID = "FORMSPREE_ID";

const enquiryTypes = [
  "Cove API Access",
  "Canton Bridge",
  "Partnership",
  "Press",
  "Other",
];

const partnerships = [
  "Institutions and developers building wallet products on Canton",
  "Liquidity providers and bridge partners",
  "Canton ecosystem participants looking for infrastructure",
  "Institutions looking to build on Canton without running their own node",
];

const contactInfo = [
  {
    label: "Email",
    value: "admin@qasara.ai",
    href: "mailto:admin@qasara.ai",
    icon: <Mail className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    label: "Website",
    value: "qasara.ai",
    href: "https://qasara.ai",
    icon: <Globe className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    label: "Network",
    value: "Canton Network",
    href: "https://canton.network",
    icon: <Network className="h-5 w-5" strokeWidth={1.5} />,
  },
];

export default function ContactPage() {
  return (
    <>
      <HeroSection
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="API access, partnerships, and Canton ecosystem enquiries."
      />

      <section className="relative pb-24 md:pb-32">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* FORM */}
            <Reveal className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-card/60 p-8 md:p-10">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-teal/[0.05] via-transparent to-transparent" />

                <Suspense fallback={null}>
                  <SuccessBanner />
                </Suspense>

                <div className="relative">
                  <div className="eyebrow mb-4">
                    <span>Send us a message</span>
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    How can we help?
                  </h2>

                  <form
                    action={`https://formspree.io/f/${FORMSPREE_ID}`}
                    method="POST"
                    className="mt-8 flex flex-col gap-5"
                  >
                    <input
                      type="hidden"
                      name="_next"
                      value="https://qasara.ai/contact?success=true"
                    />
                    <input type="hidden" name="_subject" value="Qasara contact enquiry" />

                    <Field label="Name" name="name" required>
                      <input
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        className="form-input"
                      />
                    </Field>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Email" name="email" required>
                        <input
                          type="email"
                          name="email"
                          required
                          autoComplete="email"
                          className="form-input"
                        />
                      </Field>
                      <Field label="Company" name="company">
                        <input
                          type="text"
                          name="company"
                          autoComplete="organization"
                          className="form-input"
                        />
                      </Field>
                    </div>

                    <Field label="Enquiry type" name="enquiry_type">
                      <select
                        name="enquiry_type"
                        className="form-input appearance-none pr-10"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select…
                        </option>
                        {enquiryTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Message" name="message" required>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        className="form-input resize-y"
                      />
                    </Field>

                    <div className="pt-2">
                      <button type="submit" className="btn-primary">
                        Send Message
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Reveal>

            {/* SIDEBAR */}
            <div className="lg:col-span-5">
              <Reveal index={1}>
                <div className="flex flex-col gap-3">
                  {contactInfo.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-xl border border-line bg-bg-card/50 p-5 transition-all hover:-translate-y-0.5 hover:border-brand-teal/40"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg-elevated text-brand-teal">
                        {c.icon}
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                          {c.label}
                        </div>
                        <div className="mt-0.5 text-sm text-ink group-hover:text-brand-mint">
                          {c.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </Reveal>

              <Reveal index={2}>
                <div className="mt-8 rounded-2xl border border-line bg-bg-card/50 p-7">
                  <div className="eyebrow mb-5">
                    <span>Partnerships</span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-ink-muted">
                    We are actively looking for partners across:
                  </p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {partnerships.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/90">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-teal" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Inline form-input style — keeps Tailwind purgeable */}
      <style>{`
        .form-input {
          width: 100%;
          background-color: #0D1220;
          border: 1px solid #1F2937;
          border-radius: 0.625rem;
          padding: 0.75rem 0.875rem;
          color: #F9FAFB;
          font-size: 0.95rem;
          line-height: 1.4;
          transition: border-color 200ms ease, box-shadow 200ms ease;
          outline: none;
        }
        .form-input::placeholder { color: #6B7280; }
        .form-input:focus {
          border-color: rgba(13, 148, 136, 0.6);
          box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
        }
        select.form-input {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1L6 6L11 1' stroke='%239CA3AF' stroke-width='1.5'/></svg>");
          background-repeat: no-repeat;
          background-position: right 1rem center;
        }
      `}</style>
    </>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        {label}
        {required && <span className="ml-1 text-brand-teal">*</span>}
      </span>
      {children}
    </label>
  );
}

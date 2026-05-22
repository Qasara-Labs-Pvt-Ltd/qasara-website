import { ReactNode } from "react";

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  const alignClass =
    align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <div className={`flex max-w-3xl flex-col ${alignClass}`}>
      <div className="eyebrow">
        {index && (
          <span className="text-brand-teal/80">{index}</span>
        )}
        <span className="eyebrow-dot" aria-hidden />
        <span>{eyebrow}</span>
      </div>
      <h2 className="display-h2 mt-6 text-balance">{title}</h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

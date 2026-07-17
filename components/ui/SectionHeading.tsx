import { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start";
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="text-base text-ink/60 sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

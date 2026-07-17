"use client";

import { useState } from "react";
import Link from "next/link";
import { services } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { StartProjectButton } from "@/components/ui/StartProjectButton";

export function PricingTabs() {
  const [active, setActive] = useState(services[0].slug);
  const service = services.find((s) => s.slug === active)!;

  return (
    <div>
      <div className="mx-auto flex w-fit flex-wrap justify-center gap-2 rounded-full bg-master-50/60 p-2">
        {services.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => setActive(s.slug)}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              active === s.slug
                ? "bg-darkgreen text-white shadow-glow"
                : "text-ink/70 hover:text-ink"
            }`}
          >
            <span className="text-lg">{s.emoji}</span>
            {s.title}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {service.pricing.map((t, i) => (
          <Reveal key={t.name} delay={i * 120}>
            <div
              className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-2 ${
                t.featured
                  ? "border-master bg-darkgreen text-white shadow-glow"
                  : "border-ink/10 bg-white shadow-card"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-master px-4 py-1 text-xs font-bold text-ink">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold">{t.name}</h3>
              <p className={`mt-1 text-sm ${t.featured ? "text-white/70" : "text-ink/60"}`}>
                {t.blurb}
              </p>
              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-4xl font-extrabold">{t.price}</span>
                <span className={`mb-1 text-sm ${t.featured ? "text-white/60" : "text-ink/50"}`}>
                  {t.period}
                </span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className={t.featured ? "text-master" : "text-darkgreen"}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <StartProjectButton
                  className={t.featured ? "btn-master w-full" : "btn-outline w-full"}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-ink/50">
        Looking for a custom scope?{" "}
        <Link href="/contact" className="font-semibold text-darkgreen underline-offset-4 hover:underline">
          Contact us
        </Link>{" "}
        for a tailored quote.
      </p>
    </div>
  );
}

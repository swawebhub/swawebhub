"use client";

import { StartProjectButton } from "@/components/ui/StartProjectButton";
import { services } from "@/lib/site";

export function PricingCards({ serviceSlug }: { serviceSlug?: string } = {}) {
  const displayServices = serviceSlug
    ? services.filter((s) => s.slug === serviceSlug)
    : services;

  return (
    <div className="grid gap-10">
      {displayServices.map((s) => (
        <div key={s.slug}>
          {!serviceSlug && (
            <div className="mb-6 flex items-center gap-3">
              <span className="text-3xl">{s.emoji}</span>
              <div>
                <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                <p className="text-sm text-ink/60">{s.tagline}</p>
              </div>
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-3">
            {s.pricing.map((t, i) => (
              <div
                key={t.name}
                className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-2 ${
                  t.featured
                    ? "border-master bg-darkgreen text-white shadow-glow"
                    : "border-ink/10 bg-white shadow-card"
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-master px-4 py-1 text-xs font-bold text-ink">
                    Most Popular
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

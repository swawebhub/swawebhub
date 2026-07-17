"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs = [
  { q: "What does SWAWEBHUB do?", a: "We design, develop, and optimize modern websites — covering Web Design, Web Development, and SEO under one roof." },
  { q: "How long does a typical project take?", a: "Most sites ship in 3–6 weeks depending on scope. We share a clear timeline before we start." },
  { q: "Do you build with Next.js?", a: "Yes. We specialize in fast, scalable Next.js & Tailwind builds for performance and SEO." },
  { q: "Can you help with SEO after launch?", a: "Absolutely. Our SEO Website service includes on-page optimization, structured data, and ongoing growth plans." },
  { q: "How does pricing work?", a: "We offer fixed-scope packages and custom quotes. See our Pricing page for starter tiers." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section bg-master-50/40">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Questions, <span className="text-darkgreen">answered</span></>}
          subtitle="Everything you need to know before starting a project with us."
        />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 80}>
              <div className="overflow-hidden rounded-2xl border border-ink/5 bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold">{f.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-master-50 text-darkgreen transition-transform duration-300 ${
                      open === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-ink/65">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

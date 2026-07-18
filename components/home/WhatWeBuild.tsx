import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { services } from "@/lib/site";

export function WhatWeBuild() {
  return (
    <section id="what-we-build" className="section bg-[#ffd4002e]">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Our Services"
          title={
            <>
              Professional <span className="text-master">Web Design, Development & SEO Services</span>
            </>
          }
          subtitle="From responsive web design and Shopify & WordPress customization to Next.js development, API integration, and technical SEO, we build high-performance websites that help businesses grow."
          className="mb-14 md:max-w-[80%] w-full mx-auto"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 120}>
              <Link
                href={`/services/${s.slug}`}
                className="card-hover group flex h-full flex-col"
              >
                <EmojiIcon emoji={s.emoji} />
                <span className="mt-5 text-xs font-semibold uppercase tracking-widest text-darkgreen">
                  {s.tagline}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm text-ink/60">{s.desc}</p>
                <ul className="mt-5 grid gap-2 text-sm text-ink/70">
                  {s.work.map((w) => (
                    <li key={w.t} className="flex items-start gap-2">
                      <span className="mt-0.5 text-darkgreen">{w.e}</span>
                      <span>
                        <span className="font-semibold text-ink">{w.t}</span> — {w.d}
                      </span>
                    </li>
                  ))}
                </ul>
                {s.tools && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {s.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-ink/60 ring-1 ring-ink/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-darkgreen opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more →
                </span>
                <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-master-50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

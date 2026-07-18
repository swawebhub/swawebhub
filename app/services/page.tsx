import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTA } from "@/components/ui/CTA";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { services, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — Web Design, Development & SEO | SWAWEBHUB",
  description:
    "Explore SWAWEBHUB services: Web Design, Web Development, and SEO Websites. Modern, conversion-focused solutions built with Next.js and Tailwind.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "Services — SWAWEBHUB",
    description:
      "Web Design, Web Development, and SEO Websites engineered to rank, load fast, and convert.",
    url: `${SITE_URL}/services`,
    siteName: "SWAWEBHUB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const approach = [
  { e: "🔍", t: "Discover", d: "We learn your goals, audience, and competitors to set the right direction." },
  { e: "🧭", t: "Plan", d: "A clear scope and roadmap across design, build, and growth." },
  { e: "🚀", t: "Build & launch", d: "Senior execution with weekly, clickable progress." },
  { e: "📈", t: "Grow", d: "We measure, optimize, and iterate on real data." },
];

const combos = [
  { e: "🎨💻", t: "Design + Development", d: "A pixel-perfect site, built and shipped by one team — no handoff gaps." },
  { e: "💻🚀", t: "Development + SEO", d: "A fast, technically sound site engineered to rank from day one." },
  { e: "🎨🚀", t: "Design + SEO", d: "Beautiful pages structured for search and conversions together." },
  { e: "🎨💻🚀", t: "Full Stack Growth", d: "The complete package: design, build, and ongoing SEO in one plan." },
];

const stats = [
  { n: "120+", l: "Sites shipped" },
  { n: "98%", l: "Client retention" },
  { n: "5x", l: "Avg. traffic lift" },
  { n: "8+", l: "Years experience" },
];

export const dynamic = 'force-static';

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Three services, one growth engine"
        subtitle="Pick the capability your business needs — or combine them for a complete web presence."
        breadcrumb={[{ label: "Services", href: "/services" }]}
      />

      {/* Service cards */}
      <section className="section bg-white">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 120}>
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
      </section>

      {/* Why SWAWEBHUB */}
      <section className="section bg-[#ffd4002e]">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Why SWAWEBHUB"
            title={<>Everything you need to <span className="text-darkgreen">win on the web</span></>}
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { e: "⚡", t: "Fast by default", d: "Performance is engineered in, not bolted on." },
              { e: "🎯", t: "Conversion-first", d: "Design and code aimed at measurable outcomes." },
              { e: "🔍", t: "SEO-native", d: "Structured data and semantics from day one." },
              { e: "🤝", t: "Transparent", d: "Clear scopes, shared boards, no surprises." },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 100}>
                <div className="card-hover h-full text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-master-50 text-3xl">
                    {v.e}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{v.t}</h3>
                  <p className="mt-2 text-sm text-ink/60">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Approach"
            title={<>A simple path from <span className="text-darkgreen">idea to growth</span></>}
            subtitle="One consistent process across every service we deliver."
            className="mb-14"
          />
          <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-master to-transparent lg:block" />
            {approach.map((p, i) => (
              <Reveal key={p.t} delay={i * 100}>
                <div className="relative flex flex-col items-start gap-4">
                  <div className="z-10 grid h-14 w-14 place-items-center rounded-2xl bg-darkgreen text-2xl text-master shadow-glow">
                    {p.e}
                  </div>
                  <div className="font-display text-lg font-bold">
                    {String(i + 1).padStart(2, "0")}. {p.t}
                  </div>
                  <p className="text-sm text-ink/60">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Combine services */}
      <section className="section bg-[#ffd4002e]">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Combine & Save"
            title={<>Powerful when <span className="text-darkgreen">used together</span></>}
            subtitle="Most clients blend two or more services. Here are the common pairings."
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {combos.map((c, i) => (
              <Reveal key={c.t} delay={i * 100}>
                <div className="card-hover h-full">
                  <div className="text-3xl">{c.e}</div>
                  <h3 className="mt-4 font-display text-xl font-bold">{c.t}</h3>
                  <p className="mt-2 text-sm text-ink/60">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-darkgreen text-white">
        <div className="container-x grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 100}>
              <div>
                <div className="font-display text-4xl font-extrabold text-master sm:text-5xl">
                  {s.n}
                </div>
                <div className="mt-2 text-sm text-white/70">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA
        title="Let's build your growth engine"
        subtitle="Start a project and we'll scope the right services for your goals."
      />
    </>
  );
}

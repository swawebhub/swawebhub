import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, getService, SITE_URL } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTA } from "@/components/ui/CTA";
import { StartProjectButton } from "@/components/ui/StartProjectButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { PricingCards } from "@/components/PricingCards";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamic = 'force-static';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return { title: "Service — SWAWEBHUB" };
  return {
    title: `${s.title} — SWAWEBHUB`,
    description: s.desc,
    alternates: { canonical: `${SITE_URL}/services/${s.slug}` },
    openGraph: {
      title: `${s.title} — SWAWEBHUB`,
      description: s.desc,
      url: `${SITE_URL}/services/${s.slug}`,
      siteName: "SWAWEBHUB",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader
        eyebrow={service.tagline}
        title={service.title}
        subtitle={service.hero}
        breadcrumb={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* Features */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="What's included"
            title={<>Everything in <span className="text-darkgreen">{service.title}</span></>}
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => (
              <Reveal key={f.t} delay={i * 80}>
                <div className="card-hover h-full">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-master-50 text-2xl">
                    {f.e}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{f.t}</h3>
                  <p className="mt-2 text-sm text-ink/60">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-[#ffd4002e]">
        <div className="container-x">
          <SectionHeading
            eyebrow="How it works"
            title={<>Our {service.title} <span className="text-darkgreen">process</span></>}
            className="mb-14"
          />
          <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-master to-transparent lg:block" />
            {service.process.map((p, i) => (
              <Reveal key={p.t} delay={i * 100}>
                <div className="relative flex flex-col items-start gap-4">
                  <div className="z-10 grid h-14 w-14 place-items-center rounded-2xl bg-darkgreen text-2xl text-master shadow-glow">
                    {p.e}
                  </div>
                  <div className="font-display text-lg font-bold">{p.t}</div>
                  <p className="text-sm text-ink/60">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-darkgreen text-7xl">
              <div className="grid h-full place-items-center">{service.emoji}</div>
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Deliverables"
              title={<>What you'll <span className="text-darkgreen">receive</span></>}
            />
            <Reveal delay={100}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-sm font-medium">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-master text-ink">
                      ✓
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={200}>
              <Link href="/pricing" className="btn-outline w-fit">
                See pricing →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pricing for this service */}
      <section className="section bg-[#ffd4002e]">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title={<>{service.title} <span className="text-darkgreen">plans</span></>}
            className="mb-14"
          />
          <PricingCards serviceSlug={service.slug} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title={<>{service.title} <span className="text-darkgreen">questions</span></>} />
          <div className="space-y-3">
            {service.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 80}>
                <details className="group rounded-2xl border border-ink/5 bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-master-50 text-darkgreen transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-ink/65">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="section bg-[#ffd4002e]">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Explore more" title={<>Other <span className="text-darkgreen">services</span></>} className="mb-14" />
          <div className="grid gap-6 sm:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group flex items-center gap-4 rounded-3xl border border-ink/5 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-master/40"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-master-50 text-3xl">
                  {o.emoji}
                </span>
                <span>
                  <span className="block font-display text-lg font-bold group-hover:text-darkgreen">
                    {o.title}
                  </span>
                  <span className="block text-sm text-ink/60">{o.tagline}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title={`Ready to start your ${service.title.toLowerCase()} project?`}
        subtitle="Open the multistep form and we'll scope it with you in minutes."
      />
    </>
  );
}

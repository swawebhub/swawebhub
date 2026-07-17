import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/site";

export function ServicesPreview() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Services"
          title={<>What we can <span className="text-darkgreen">build for you</span></>}
          subtitle="Three core services designed to take a site from idea to measurable growth."
          className="mb-14"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 120}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-master/40 hover:shadow-glow"
              >
                <div className="grid h-40 place-items-center bg-master-50/60 text-5xl transition-transform duration-500 group-hover:scale-105">
                  {s.emoji}
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-bold transition-colors group-hover:text-darkgreen">
                    {s.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-ink/60">{s.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-darkgreen">
                    Explore service →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="btn-outline">
            View all services →
          </Link>
        </div>
      </div>
    </section>
  );
}

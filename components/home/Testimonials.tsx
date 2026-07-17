import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    e: "👩‍💼",
    name: "Aisha Khan",
    role: "Founder, Lumina Co.",
    text: "SWAWEBHUB rebuilt our site and organic traffic tripled in 4 months. The design is unreal.",
  },
  {
    e: "🧑‍💻",
    name: "David Reyes",
    role: "CTO, Northpeak",
    text: "Cleanest Next.js codebase we've inherited. Fast, accessible, and a joy to extend.",
  },
  {
    e: "👨‍🔧",
    name: "Marcus Bell",
    role: "Owner, Bell Auto",
    text: "They actually explained the SEO work. Leads are up 60% and the site loads instantly.",
  },
];

export function Testimonials() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title={<>Loved by founders & <span className="text-darkgreen">marketing teams</span></>}
          className="mb-14"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <figure className="card-hover h-full">
                <div className="text-3xl">{t.e}</div>
                <blockquote className="mt-4 text-ink/80">“{t.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-master-50 text-lg">
                    {t.e}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-ink/60">{t.role}</div>
                  </div>
                </figcaption>
                <span className="absolute -right-2 -top-2 text-6xl text-master-50">”</span>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

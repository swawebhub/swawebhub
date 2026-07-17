import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutSection() {
  return (
    <section className="section bg-white">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-master-50">
              <div className="grid h-full place-items-center text-7xl">🤝</div>
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-darkgreen px-6 py-4 text-white shadow-glow sm:block">
              <div className="font-display text-2xl font-bold text-master">8+ yrs</div>
              <div className="text-xs text-white/70">crafting the web</div>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="About SWAWEBHUB"
            title={<>A studio obsessed with <span className="text-darkgreen">results</span></>}
            subtitle="We blend bold design with engineering discipline to ship websites that feel premium and perform even better."
          />
          <Reveal delay={100}>
            <p className="text-ink/70">
              From the first wireframe to the final deploy, we treat your project
              like our own. Our lean, senior team removes the fluff and delivers
              measurable impact.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {["Strategy-led design", "Clean Next.js code", "Built-in SEO", "Transparent process"].map(
                (f) => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-master text-ink">
                      ✓
                    </span>
                    {f}
                  </li>
                )
              )}
            </ul>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/about" className="btn-outline w-fit">
              More about us →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

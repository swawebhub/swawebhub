import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { e: "🔍", t: "Discover", d: "We dig into your goals, audience, and competitors to map the right plan." },
  { e: "🎨", t: "Design", d: "Bold, conversion-led UI mockups you can click, review, and refine." },
  { e: "💻", t: "Develop", d: "Clean Next.js builds, tested across devices, shipped on schedule." },
  { e: "🚀", t: "Launch & Grow", d: "We optimize for SEO and performance, then iterate on data." },
];

export function HowWeWork() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="How We Work"
          title={<>A simple, transparent <span className="text-darkgreen">process</span></>}
          subtitle="No black boxes. You see progress at every step."
          className="mb-14"
        />
        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-master to-transparent lg:block" />
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 120}>
              <div className="relative flex flex-col items-start gap-4">
                <div className="z-10 grid h-14 w-14 place-items-center rounded-2xl bg-darkgreen text-2xl text-master shadow-glow">
                  {s.e}
                </div>
                <div className="font-display text-lg font-bold">
                  {String(i + 1).padStart(2, "0")}. {s.t}
                </div>
                <p className="text-sm text-ink/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

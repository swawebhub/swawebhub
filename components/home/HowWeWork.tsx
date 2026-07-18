import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    e: "🔎",
    t: "Discovery & Strategy",
    d: "We analyze your business goals, target audience, competitors, and project requirements to create a clear strategy for long-term digital success."
  },
  {
    e: "🎨",
    t: "UI/UX Design",
    d: "Our team designs modern, responsive, and user-focused interfaces that strengthen your brand identity and maximize engagement and conversions."
  },
  {
    e: "💻",
    t: "Development",
    d: "We build fast, secure, and scalable websites using Next.js, Shopify, WordPress, and custom API integrations with clean, maintainable code."
  },
  {
    e: "🚀",
    t: "SEO, Launch & Growth",
    d: "Before launch, we optimize performance, Core Web Vitals, and technical SEO to improve Google rankings, increase traffic, and support business growth."
  },
];

export function HowWeWork() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Process"
          title={
            <div className="mt-4">
              Our Proven <span className="text-master">Web Design & Development Process</span>
            </div>
          }
          subtitle="From strategy and UI/UX design to development, SEO optimization, and launch, we follow a transparent process that delivers fast, scalable, and high-performing websites."
          className="mb-14 md:max-w-[80%] w-full mx-auto text-center justify-center items-center"
        />
        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-master to-transparent lg:block" />
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 120}>
              <div className="relative flex flex-col items-center justify-center text-center gap-4">
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

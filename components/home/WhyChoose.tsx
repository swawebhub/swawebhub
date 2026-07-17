import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  { e: "⚡", t: "Blazing fast", d: "Core Web Vitals baked in — speed is a feature, not an afterthought." },
  { e: "🎯", t: "Conversion-first", d: "Every pixel earns its place with measurable business outcomes." },
  { e: "🔒", t: "Rock-solid code", d: "Typed, tested, and maintainable. No spaghetti, ever." },
  { e: "📞", t: "Real humans", d: "Direct access to the senior team building your site." },
  { e: "📈", t: "SEO-native", d: "Structured data, semantic HTML, and performance from day one." },
  { e: "🤝", t: "Honest pricing", d: "Clear scopes and no surprise invoices." },
];

export function WhyChoose() {
  return (
    <section className="section bg-darkgreen text-white">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Why Choose SWAWEBHUB"
          title={<>The studio that <span className="text-master">treats growth seriously</span></>}
          subtitle="Six reasons teams trust us with their most important digital asset."
          className="mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.t} delay={i * 100}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-master/50 hover:bg-white/10">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-master text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  {r.e}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{r.t}</h3>
                <p className="mt-2 text-sm text-white/65">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

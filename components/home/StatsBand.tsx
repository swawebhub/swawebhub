import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { n: "120+", l: "Websites shipped" },
  { n: "98%", l: "Client retention" },
  { n: "5x", l: "Average traffic lift" },
  { n: "8+", l: "Years of experience" },
];

export function StatsBand() {
  return (
    <section className="bg-darkgreen text-white">
      <div className="container-x grid grid-cols-2 gap-8 py-14 text-center lg:grid-cols-4">
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
  );
}

import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTA } from "@/components/ui/CTA";
import { StartProjectButton } from "@/components/ui/StartProjectButton";
import { techStacks, techPrinciples, techEcosystem } from "@/lib/site";

export const metadata = {
  title: "Technology — Web Design, Development & SEO Tools | SWAWEBHUB",
  description:
    "Explore the modern technologies and tools we use for web design, development, and SEO — Figma, Next.js, React, WordPress, Google Analytics, and more.",
  alternates: { canonical: "https://www.swawebhub.com/technology" },
  robots: { index: true, follow: true },
};

export const dynamic = "force-static";

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  pink: { bg: "bg-pink-500/10", text: "text-pink-600", border: "border-pink-500/30" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/30" },
  green: { bg: "bg-green-500/10", text: "text-green-600", border: "border-green-500/30" },
};

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Technology"
        title="Modern tools, built for performance"
        subtitle="We use industry-leading technologies to design, develop, and optimize websites that are fast, scalable, and future-proof."
        breadcrumb={[{ label: "Technology" }]}
      />

      {/* Tech Ecosystem Overview */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="How We Work"
            title={<>Our <span className="text-darkgreen">technology ecosystem</span></>}
            subtitle="A seamless workflow from design to deployment and growth."
            className="mb-14"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {techEcosystem.map((eco, i) => (
              <Reveal key={eco.phase} delay={i * 120}>
                <div className="card-hover h-full text-center">
                  <div className={`mx-auto grid h-20 w-20 place-items-center rounded-2xl ${colorMap[eco.color].bg} text-4xl`}>
                    {eco.phase === "Design" ? "🎨" : eco.phase === "Development" ? "💻" : "🚀"}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{eco.phase}</h3>
                  <p className="mt-2 text-sm text-ink/60">
                    {eco.phase === "Design" && "Wireframing, prototyping, and visual design systems."}
                    {eco.phase === "Development" && "Frontend, backend, CMS, and e-commerce platforms."}
                    {eco.phase === "SEO & Launch" && "Analytics, monitoring, and continuous optimization."}
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {eco.tools.map((tool) => (
                      <span key={tool} className="rounded-full bg-master-50 px-3 py-1 text-xs font-medium text-ink/70">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technology sections with advanced cards */}
      {techStacks.map((stack, idx) => (
        <section
          key={stack.service}
          className={`section ${idx % 2 === 0 ? "bg-white" : "bg-[#ffd4002e]"}`}
        >
          <div className="container-x">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <div className="relative">
                  <div className={`aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br ${stack.color} border ${stack.border} p-8 flex items-center justify-center`}>
                    <div className="text-center">
                      <div className="text-6xl mb-4">{stack.emoji}</div>
                      <h3 className="font-display text-2xl font-bold">{stack.service}</h3>
                      <p className="mt-2 text-sm text-ink/60">{stack.stats.projects} projects delivered</p>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-2xl bg-darkgreen px-6 py-3 text-white shadow-glow">
                    <div className="font-display text-2xl font-bold text-master">{stack.stats.satisfaction}</div>
                    <div className="text-xs text-white/70">Satisfaction</div>
                  </div>
                </div>
              </Reveal>
              <div className="flex flex-col gap-6">
                <SectionHeading
                  eyebrow={stack.service}
                  title={<>Our <span className="text-darkgreen">{stack.service}</span> stack</>}
                  subtitle={`Tools and technologies we use to deliver exceptional ${stack.service.toLowerCase()} services.`}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {stack.tools.map((tool, i) => (
                    <Reveal key={tool.name} delay={i * 80}>
                      <div className="flex items-start gap-4 rounded-2xl border border-ink/5 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-master/40 hover:shadow-glow">
                        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${stack.iconBg} text-xl`}>
                          ⚙️
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-display font-bold">{tool.name}</h4>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${stack.iconBg} ${stack.color.includes('pink') ? 'text-pink-700' : stack.color.includes('blue') ? 'text-blue-700' : 'text-green-700'}`}>
                              {tool.level}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-ink/60">{tool.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Capabilities Strip */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Capabilities"
            title={<>What we <span className="text-darkgreen">deliver</span></>}
            subtitle="End-to-end capabilities across design, development, and growth."
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {techStacks.flatMap((stack) =>
              stack.capabilities.map((cap, i) => (
                <Reveal key={`${stack.service}-${cap}`} delay={i * 80}>
                  <div className="card-hover h-full text-center">
                    <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ${stack.iconBg} text-2xl`}>
                      {stack.emoji}
                    </div>
                    <h4 className="mt-4 font-display font-bold">{cap}</h4>
                    <p className="mt-1 text-xs text-ink/60">{stack.service}</p>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Principles with metrics */}
      <section className="section bg-[#ffd4002e]">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Our Principles"
            title={<>Built on <span className="text-darkgreen">proven foundations</span></>}
            subtitle="Every project is guided by these core technology principles."
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {techPrinciples.map((item, i) => (
              <Reveal key={item.t} delay={i * 100}>
                <div className="card-hover h-full text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-master-50 text-3xl">
                    {item.e}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{item.t}</h3>
                  <p className="mt-2 text-sm text-ink/60">{item.d}</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-darkgreen px-4 py-1.5 text-xs font-semibold text-master">
                    <span className="h-2 w-2 rounded-full bg-master" />
                    {item.metric}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Benchmarks */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Performance"
            title={<>Numbers that <span className="text-darkgreen">matter</span></>}
            subtitle="We measure success by real metrics, not just aesthetics."
            className="mb-14"
          />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { n: "99", s: "PageSpeed score", icon: "⚡" },
              { n: "<2s", s: "Load time", icon: "🚀" },
              { n: "100%", s: "Lighthouse perf", icon: "🎯" },
              { n: "0", s: "Security issues", icon: "🔒" },
            ].map((stat, i) => (
              <Reveal key={stat.s} delay={i * 100}>
                <div className="card-hover h-full text-center">
                  <div className="text-4xl">{stat.icon}</div>
                  <div className="mt-4 font-display text-3xl font-extrabold text-darkgreen sm:text-4xl">
                    {stat.n}
                  </div>
                  <div className="mt-2 text-sm text-ink/60">{stat.s}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Tech */}
      <section className="section bg-darkgreen text-white">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Why Us"
            title={<>Why teams choose <span className="text-master">SWAWEBHUB</span></>}
            subtitle="We don't just use tools — we master them to deliver results."
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { e: "🎓", t: "Certified experts", d: "Our team holds certifications in Figma, Next.js, Google Analytics, and more." },
              { e: "🔄", t: "Continuous learning", d: "We dedicate 20% of our time to learning new tools and best practices." },
              { e: "📊", t: "Data-driven", d: "Every decision is backed by analytics and performance metrics." },
              { e: "🤝", t: "Transparent process", d: "You'll know exactly what tools we use and why." },
              { e: "🛡️", t: "Enterprise security", d: "SOC 2 compliant processes and secure coding standards." },
              { e: "🌱", t: "Sustainable code", d: "We write clean, maintainable code that lasts for years." },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 100}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-master/50 hover:bg-white/10">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-master text-2xl text-darkgreen">
                    {item.e}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{item.t}</h3>
                  <p className="mt-2 text-sm text-white/65">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Ready to build with modern tech?"
        subtitle="Let's discuss your project and pick the right stack for your goals."
      />
    </>
  );
}

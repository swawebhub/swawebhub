import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StartProjectButton } from "@/components/ui/StartProjectButton";
import { CTA } from "@/components/ui/CTA";

export const metadata = {
  title: "About Us — SWAWEBHUB",
  description:
    "Meet SWAWEBHUB — a senior, design-led studio helping ambitious brands win on the web with web design, development, and SEO.",
  alternates: { canonical: "https://www.swawebhub.com/about" },
};

const values = [
  { e: "🎯", t: "Outcome over output", d: "We measure success by your metrics, not our deliverables." },
  { e: "🤝", t: "Partnership", d: "We embed with your team and stay accountable after launch." },
  { e: "🔍", t: "Craft & care", d: "Details matter — from a11y to the last 1px of spacing." },
  { e: "🌱", t: "Continuous growth", d: "Launch is the start. We optimize as your business scales." },
];

const team = [
  { e: "👩‍💼", n: "Aisha Khan", r: "Founder & Strategy" },
  { e: "🧑‍🎨", n: "Leo Park", r: "Lead Designer" },
  { e: "👨‍💻", n: "Sam Rivera", r: "Engineering Lead" },
  { e: "📈", n: "Mia Chen", r: "SEO & Growth" },
];

const timeline = [
  { y: "2018", t: "Founded", d: "SWAWEBHUB began as a small design-and-build partnership." },
  { y: "2020", t: "SEO practice", d: "We added a dedicated SEO & growth team to close the loop." },
  { y: "2023", t: "Next.js first", d: "We standardized on Next.js + Tailwind for speed and scale." },
  { y: "2026", t: "120+ shipped", d: "Hundreds of launches and a 98% client retention rate." },
];

const process = [
  { e: "💬", t: "Kickoff", d: "We align on goals, scope, and success metrics in a short workshop." },
  { e: "🧩", t: "Co-create", d: "Weekly check-ins with clickable previews — no black boxes." },
  { e: "🚀", t: "Launch", d: "A smooth, monitored rollout with analytics wired in." },
  { e: "🔁", t: "Iterate", d: "Post-launch optimization based on real performance data." },
];

const clients = ["Lumina", "Northpeak", "Bell Auto", "Mira", "Orbit", "Vertex"];

const testimonial = {
  e: "💬",
  text: "SWAWEBHUB feels less like an agency and more like an extension of our team. The site they built doubled our leads.",
  name: "David Reyes",
  role: "CTO, Northpeak",
};

export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="The team behind SWAWEBHUB"
        subtitle="A senior, design-led studio helping ambitious brands win on the web."
        breadcrumb={[{ label: "About" }]}
      />

      {/* Story + stats */}
      <section className="section bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-darkgreen text-7xl">
                <div className="grid h-full place-items-center">🌟</div>
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Our Story"
              title={<>From side projects to <span className="text-darkgreen">growth partner</span></>}
            />
            <Reveal delay={100}>
              <p className="text-ink/70">
                SWAWEBHUB started with a simple belief: great websites should be
                fast, beautiful, and built to grow businesses. Today we partner
                with startups and established brands to ship modern web products
                end-to-end.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { n: "120+", l: "Projects" },
                  { n: "8+", l: "Years" },
                  { n: "40+", l: "Happy clients" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl bg-master-50 p-4 text-center">
                    <div className="font-display text-2xl font-bold text-darkgreen">
                      {s.n}
                    </div>
                    <div className="text-xs text-ink/60">{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-[#ffd4002e]">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Our Mission"
            title={<>We exist to make the web <span className="text-darkgreen">work for growing businesses</span></>}
            subtitle="Beautiful is not enough. We build sites that earn attention, rank, and revenue."
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { e: "🌍", t: "Accessible to all", d: "We design for every user, on every device, with care for a11y." },
              { e: "⚡", t: "Fast for everyone", d: "Performance is a right, not a luxury — we treat speed as core." },
              { e: "📈", t: "Built to grow", d: "Every project is a foundation you can scale for years." },
            ].map((m, i) => (
              <Reveal key={m.t} delay={i * 100}>
                <div className="card-hover h-full text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-master-50 text-3xl">
                    {m.e}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{m.t}</h3>
                  <p className="mt-2 text-sm text-ink/60">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Our Values"
            title={<>What we stand for</>}
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
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

      {/* How we work with you */}
      <section className="section bg-[#ffd4002e]">
        <div className="container-x">
          <SectionHeading
            eyebrow="How We Work With You"
            title={<>A partnership, <span className="text-darkgreen">not a handoff</span></>}
            className="mb-14"
          />
          <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-master to-transparent lg:block" />
            {process.map((p, i) => (
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

      {/* Timeline */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Our Journey"
            title={<>Milestones along the <span className="text-darkgreen">way</span></>}
            className="mb-14"
          />
          <div className="mx-auto max-w-3xl">
            {timeline.map((t, i) => (
              <Reveal key={t.y} delay={i * 100}>
                <div className="flex gap-6 border-l-2 border-master/40 pb-10 pl-6 last:pb-0">
                  <div className="grid h-12 w-12 shrink-0 -translate-x-12 place-items-center rounded-full bg-darkgreen text-sm font-bold text-master shadow-glow">
                    {t.y}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{t.t}</h3>
                    <p className="mt-1 text-sm text-ink/60">{t.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Clients strip */}
      <section className="section bg-darkgreen text-white">
        <div className="container-x text-center">
          <p className="text-sm uppercase tracking-widest text-master">Trusted by</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {clients.map((c) => (
              <span key={c} className="font-display text-2xl font-bold text-white/80">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="The Team"
            title={<>Meet the people <span className="text-darkgreen">building your site</span></>}
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.n} delay={i * 100}>
                <div className="group h-full rounded-3xl border border-ink/5 bg-white p-6 text-center shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-master/40 hover:shadow-glow">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-master-50 text-4xl transition-transform duration-500 group-hover:scale-110">
                    {m.e}
                  </div>
                  <h3 className="mt-4 font-display font-bold">{m.n}</h3>
                  <p className="text-sm text-ink/60">{m.r}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section bg-[#ffd4002e]">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-3xl border border-ink/5 bg-white p-10 text-center shadow-card">
              <div className="text-4xl">{testimonial.e}</div>
              <blockquote className="mt-4 font-display text-xl font-medium text-ink">
                “{testimonial.text}”
              </blockquote>
              <figcaption className="mt-6 text-sm text-ink/60">
                <span className="font-semibold text-ink">{testimonial.name}</span> — {testimonial.role}
              </figcaption>
            </div>
          </Reveal>
          <div className="mt-12 flex justify-center">
            <StartProjectButton />
          </div>
        </div>
      </section>

      <CTA
        title="Let's build your story with SWAWEBHUB"
        subtitle="Tell us about your brand and we'll craft a site that grows with you."
      />
    </>
  );
}

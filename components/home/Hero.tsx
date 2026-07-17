"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { StartProjectButton } from "@/components/ui/StartProjectButton";

export function Hero() {
  return (
    <section className="gradient-hero noise relative overflow-hidden text-white">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 animate-blob bg-master/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 animate-blob bg-master/10 blur-3xl" />
      <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-master">
              🌟 Your growth partner
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Websites that{" "}
              <span className="text-master">rank, load & convert</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg text-white/75">
              SWAWEBHUB is a design-first studio crafting modern web experiences
              with Web Design, Development & SEO — built to grow your business.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-4">
              <StartProjectButton className="btn-master" />
              <Link href="/pricing" className="btn border border-white/30 text-white hover:bg-white/10">
                View Pricing
              </Link>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {[
                { n: "120+", l: "Sites shipped" },
                { n: "98%", l: "Client retention" },
                { n: "5x", l: "Avg. traffic lift" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-bold text-master">
                    {s.n}
                  </div>
                  <div className="text-xs text-white/60">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative animate-float rounded-3xl bg-white/10 p-6 backdrop-blur-md">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { e: "🎨", t: "Web Design" },
                { e: "💻", t: "Development" },
                { e: "🚀", t: "SEO" },
                { e: "📈", t: "Growth" },
              ].map((c) => (
                <div
                  key={c.t}
                  className="group rounded-2xl border border-white/15 bg-white/5 p-5 transition-all hover:-translate-y-1 hover:bg-master hover:text-ink"
                >
                  <div className="text-3xl transition-transform group-hover:scale-110">
                    {c.e}
                  </div>
                  <div className="mt-3 font-semibold">{c.t}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

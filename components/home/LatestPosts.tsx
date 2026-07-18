import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { posts } from "@/lib/data";

export function LatestPosts() {
  const latest = posts.slice(0, 3);
  return (
    <section className="section bg-[#ffd4002e]">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex max-w-xl flex-col gap-4">
            <div><span className="eyebrow">From the Blog</span></div>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              Fresh thinking on <span className="text-master">web & growth</span>
            </h2>
          </div>
          <Link href="/blog" className="btn-outline w-fit">
            All articles →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latest.map((p, i) => (
            <Reveal key={p.id} delay={i * 120}>
              <Link
                href={`/blog/${p.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-master/40 hover:shadow-glow"
              >
                <div className="grid h-40 place-items-center bg-master-50/60 text-5xl transition-transform duration-500 group-hover:scale-105">
                  {p.emoji}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-ink/50">
                    <span className="rounded-full bg-master-50 px-2.5 py-1 font-medium text-darkgreen">
                      {p.category}
                    </span>
                    <span>{p.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug transition-colors group-hover:text-darkgreen">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-ink/60">{p.excerpt}</p>
                  <span className="mt-4 text-xs text-ink/50">{p.date}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

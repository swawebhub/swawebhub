import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { posts } from "@/lib/data";
import { CTA } from "@/components/ui/CTA";

export const metadata = { 
  title: "Blog — Insights on Web Design, Development & SEO | SWAWEBHUB",
  description:
    "Practical notes on web design, development, and SEO from the SWAWEBHUB studio. Learn how to build faster, rank higher, and convert more.",
  robots: { index: true, follow: true },
};

export const dynamic = 'force-static';

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Insights from the studio"
        subtitle="Practical notes on web design, development, and SEO."
        breadcrumb={[{ label: "Blog" }]}
      />
      <section className="section bg-white">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <Link
                href={`/blog/${p.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-master/40 hover:shadow-glow"
              >
                <div className="grid h-44 place-items-center bg-master-50/60 text-6xl transition-transform duration-500 group-hover:scale-105">
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
                  <div className="mt-4 flex items-center justify-between text-xs text-ink/50">
                    <span>{p.date}</span>
                    <span className="font-semibold text-darkgreen">Read →</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA
        title="Want this kind of thinking on your project?"
        subtitle="Start a project and we'll bring the same craft to your website."
      />
    </>
  );
}

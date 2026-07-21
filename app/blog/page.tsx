import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";
import { fetchPosts } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await fetchPosts({ page: 1, perPage: 12 });

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Insights from the studio"
        subtitle="Practical notes on web design, development, and SEO."
        breadcrumb={[{ label: "Blog" }]}
      />
      <section className="section bg-white">
        {posts.length === 0 ? (
          <p className="text-ink/60">No posts published yet.</p>
        ) : (
          <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-master/40 hover:shadow-glow"
                >
                  <div className="h-44 w-full overflow-hidden bg-master-50/60">
                    {p.image ? (
                      <img
                        src={`/api/proxy-image?url=${encodeURIComponent(p.image)}`}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-6xl">
                        📝
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs text-ink/50">
                      {p.categories.length > 0 && (
                        <span className="rounded-full bg-master-50 px-2.5 py-1 font-medium text-darkgreen">
                          {p.categories[0]}
                        </span>
                      )}
                      <span>{new Date(p.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug transition-colors group-hover:text-darkgreen">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-ink/60">{p.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-ink/50">
                      <span>{p.author}</span>
                      <span className="font-semibold text-darkgreen">Read →</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <CTA
        title="Want this kind of thinking on your project?"
        subtitle="Start a project and we'll bring the same craft to your website."
      />
    </>
  );
}

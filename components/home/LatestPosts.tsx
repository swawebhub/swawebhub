import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { getDb } from "@/lib/mongodb";
import { Post } from "@/lib/post";

export const dynamic = "force-dynamic";

export async function LatestPosts() {
  let posts: Post[] = [];
  try {
    const db = await getDb();
    posts = await db
      .collection<Post>("posts")
      .find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();
  } catch {
    posts = [];
  }

  return (
    <section className="section bg-[#ffd4002e]">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex max-w-xl flex-col gap-4">
            <div>
              <span className="eyebrow">From the Blog</span>
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              Fresh thinking on <span className="text-master">web & growth</span>
            </h2>
          </div>
          <Link href="/blog" className="btn-outline w-fit">
            All articles →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="mt-12 text-ink/60">No posts published yet.</p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={String(p._id)} delay={i * 120}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-master/40 hover:shadow-glow"
                >
                  <div className="h-40 w-full overflow-hidden bg-master-50/60">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-5xl">
                        {p.emoji || "📝"}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs text-ink/50">
                      <span className="rounded-full bg-master-50 px-2.5 py-1 font-medium text-darkgreen">
                        {p.category || "General"}
                      </span>
                      <span>{p.date?.slice(0, 10)}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug transition-colors group-hover:text-darkgreen">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-ink/60">{p.excerpt}</p>
                    <span className="mt-4 text-xs text-ink/50">{p.author}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/mongodb";
import { Post } from "@/lib/post";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";
import { PageHeader } from "@/components/ui/PageHeader";

export const dynamic = "force-dynamic";

async function getPostBySlug(slug: string): Promise<Post | null> {
  const db = await getDb();
  return db.collection<Post>("posts").findOne({ slug, status: "published" });
}

async function getRelated(currentSlug: string, category?: string): Promise<Post[]> {
  const db = await getDb();
  const query: any = { slug: { $ne: currentSlug }, status: "published" };
  if (category) {
    query.category = category;
  }
  return db.collection<Post>("posts").find(query).limit(3).toArray();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Blog — SWAWEBHUB",
      description: "",
      robots: { index: false, follow: true },
    };
  }
  return {
    title: `${post.title} — SWAWEBHUB`,
    description: post.excerpt,
    robots: { index: true, follow: true },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  if (post._id) {
    const db = await getDb();
    await db.collection<Post>("posts").updateOne({ _id: post._id }, { $inc: { views: 1 } });
  }

  const related = await getRelated(params.slug, post.category);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={post.title}
        subtitle={post.excerpt}
        breadcrumb={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <div className="bg-white">
        <div className="container-x max-w-3xl py-16">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="mb-8 w-full rounded-3xl object-cover"
            />
          )}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-ink/50">
            <span className="rounded-full bg-master-50 px-2.5 py-1 font-medium text-darkgreen">
              {post.category || "General"}
            </span>
            <span>By {post.author}</span>
            <span>·</span>
            <span>{post.date?.slice(0, 10)}</span>
            {post.tags.length > 0 && (
              <span className="text-master">#{post.tags.join(" #")}</span>
            )}
          </div>
          <p className="text-lg font-medium text-ink/80">{post.excerpt}</p>
          <div
            className="mt-8 whitespace-pre-wrap text-ink/70"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />
        </div>
      </div>

      <section className="section bg-white">
        <div className="container-x">
          <h3 className="mb-6 font-display text-xl font-bold">Related articles</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={String(r._id)}
                href={`/blog/${r.slug}`}
                className="group rounded-2xl border border-ink/5 p-4 transition-all hover:border-master/40 hover:shadow-card"
              >
                <div className="text-3xl">{r.emoji || "📝"}</div>
                <div className="mt-2 text-sm font-semibold group-hover:text-darkgreen">
                  {r.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Enjoyed this read?"
        subtitle="Let's put these ideas to work on your own website."
      />
    </>
  );
}

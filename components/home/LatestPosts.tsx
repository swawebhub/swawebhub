import Link from "next/link";
import { BlogCard, BlogPostCard } from "@/components/blog/BlogCard";
import { fetchPosts } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function LatestPosts() {
  const posts = await fetchPosts({ page: 1, perPage: 3 });
  const cards: BlogPostCard[] = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    author: p.author,
    image: p.image,
    imageAlt: p.imageAlt,
    categories: p.categories,
    tags: p.tags,
  }));

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

        {cards.length === 0 ? (
          <p className="mt-12 text-ink/60">No posts published yet.</p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cards.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

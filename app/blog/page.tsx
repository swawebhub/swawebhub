import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";
import { BlogCard, BlogPostCard } from "@/components/blog/BlogCard";
import { fetchPosts } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await fetchPosts({ page: 1, perPage: 12 });
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
    <>
      <PageHeader
        eyebrow="Blog"
        title="Insights from the studio"
        subtitle="Practical notes on web design, development, and SEO."
        breadcrumb={[{ label: "Blog" }]}
      />
      <section className="section bg-white">
        {cards.length === 0 ? (
          <p className="text-ink/60">No posts published yet.</p>
        ) : (
          <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
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

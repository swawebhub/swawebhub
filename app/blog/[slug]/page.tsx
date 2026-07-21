import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { CTA } from "@/components/ui/CTA";
import { fetchPostBySlug, fetchComments } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Blog — SWAWEBHUB",
      description: "",
      robots: { index: false, follow: true },
    };
  }

  const title = post.yoastTitle || `${post.title} — SWAWEBHUB`;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      title,
      description,
      url: `https://www.swawebhub.com/blog/${post.slug}`,
      images: post.image ? [{ url: post.image, alt: post.title }] : [],
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) notFound();

  const comments = await fetchComments(post.id);

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
              src={`/api/proxy-image?url=${encodeURIComponent(post.image)}`}
              alt={post.title}
              className="mb-8 w-full rounded-3xl object-cover"
            />
          )}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-ink/50">
            {post.categories.length > 0 && (
              <span className="rounded-full bg-master-50 px-2.5 py-1 font-medium text-darkgreen">
                {post.categories[0]}
              </span>
            )}
            <span>By {post.author}</span>
            <span>·</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
            {post.tags.length > 0 && (
              <span className="text-master">#{post.tags.join(" #")}</span>
            )}
          </div>
          <div className="mb-6 rounded-2xl border border-ink/5 p-4 text-xs text-ink/60">
            {post.metaDescription && (
              <p>
                <strong className="text-ink">Meta Description:</strong> {post.metaDescription}
              </p>
            )}
            {post.focusKeyword && (
              <p className="mt-1">
                <strong className="text-ink">Focus Keyphrase:</strong> {post.focusKeyword}
              </p>
            )}
            {post.yoastTitle && (
              <p className="mt-1">
                <strong className="text-ink">SEO Title:</strong> {post.yoastTitle}
              </p>
            )}
            {post.metaTags && Object.keys(post.metaTags).length > 0 && (
              <p className="mt-1">
                <strong className="text-ink">Meta Tags:</strong> {JSON.stringify(post.metaTags)}
              </p>
            )}
          </div>
          <div
            className="mt-8 space-y-4 leading-relaxed text-ink/70"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>

      {comments.length > 0 && (
        <section className="section bg-white">
          <div className="container-x max-w-3xl">
            <h3 className="mb-6 font-display text-xl font-bold">Comments</h3>
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="rounded-2xl border border-ink/5 p-4">
                  <div className="flex items-center gap-2 text-xs text-ink/50">
                    <span className="font-semibold text-ink">{c.author}</span>
                    <span>·</span>
                    <span>{new Date(c.date).toLocaleString()}</span>
                  </div>
                  <div
                    className="mt-2 text-sm text-ink/70"
                    dangerouslySetInnerHTML={{ __html: c.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA
        title="Enjoyed this read?"
        subtitle="Let's put these ideas to work on your own website."
      />
    </>
  );
}

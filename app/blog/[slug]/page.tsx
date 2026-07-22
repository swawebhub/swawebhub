import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { CTA } from "@/components/ui/CTA";
import { fetchPostBySlug, fetchComments, categoryEmoji, readingTime } from "@/lib/wordpress";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { CommentForm } from "@/components/blog/CommentForm";
import { CommentItem } from "@/components/blog/CommentItem";

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

  const title = post.seoMetaTitle || post.yoastTitle || post.title;
  const description = post.seoMetaDescription || post.metaDescription || post.excerpt;
  const focusKeyphrase = post.seoFocusKeyphrase || post.focusKeyword || "";

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
  const minutes = readingTime(post.content);
  const category = post.categories[0];
  const catEmoji = category ? categoryEmoji(category) : "📝";

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
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-ink/50">
            {category && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-master-50 px-3 py-1.5 font-semibold text-darkgreen">
                <span>{catEmoji}</span>
                <span>{category}</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-3 py-1.5">
              ✍️ {post.author}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-3 py-1.5">
              📅 {new Date(post.date).toLocaleDateString("en-US", { dateStyle: "long" })}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-3 py-1.5">
              ⏱️ {minutes} min read
            </span>
          </div>

          {post.image && (
            <img
              src={`/api/proxy-image?url=${encodeURIComponent(post.image)}`}
              alt={post.title}
              className="mb-8 w-full rounded-3xl object-cover"
              loading="eager"
            />
          )}

          {post.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/10 bg-master-50/60 px-3 py-1 text-xs font-semibold text-darkgreen transition-all duration-200 hover:border-master hover:shadow-sm"
                >
                  #{tag}
                </span>
              ))}
              {post.seoFocusKeyphrase && (
                <span className="rounded-full border border-master/40 bg-master px-3 py-1 text-xs font-bold text-darkgreen">
                  🎯 {post.seoFocusKeyphrase}
                </span>
              )}
            </div>
          )}

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </div>

      <section className="section bg-white">
        <div className="container-x max-w-3xl">
          <h3 className="mb-2 flex items-center gap-2 font-display text-2xl font-bold">
            <span>💬</span> Comments {comments.length > 0 && `(${comments.length})`}
          </h3>
          <p className="mb-8 text-sm text-ink/60">
            Have thoughts? Drop a comment below and join the conversation.
          </p>

          <CommentForm postId={post.id} />

          {comments.length > 0 && (
            <div className="mt-10 space-y-4">
              {comments.map((c) => (
                <CommentItem key={c.id} comment={c} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA
        title="Enjoyed this read?"
        subtitle="Let's put these ideas to work on your own website."
      />
    </>
  );
}

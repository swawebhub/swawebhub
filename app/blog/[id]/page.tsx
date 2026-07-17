import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";

export function generateStaticParams() {
  return posts.map((p) => ({ id: p.id }));
}

export const dynamic = 'force-static';

export function generateMetadata({ params }: { params: { id: string } }) {
  const post = getPost(params.id);
  return { title: post ? `${post.title} — SWAWEBHUB` : "Blog — SWAWEBHUB" };
}

export default function BlogDetailsPage({ params }: { params: { id: string } }) {
  const post = getPost(params.id);
  if (!post) notFound();

  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article className="bg-white">
      <div className="gradient-hero noise text-white">
        <div className="container-x py-16 text-center sm:py-20">
          <Link href="/blog" className="text-sm text-master underline-offset-4 hover:underline">
            ← Back to blog
          </Link>
          <div className="mx-auto mt-4 grid h-24 w-24 place-items-center rounded-3xl bg-white/10 text-5xl">
            {post.emoji}
          </div>
          <div className="mx-auto mt-6 flex items-center justify-center gap-2 text-xs text-white/70">
            <span className="rounded-full bg-white/10 px-3 py-1 text-master">{post.category}</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime} read</span>
          </div>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-extrabold sm:text-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="container-x max-w-3xl py-16">
        <Reveal>
          <p className="text-lg font-medium text-ink/80">{post.excerpt}</p>
          <div className="mt-8 space-y-5 text-ink/70">
            <p>
              At SWAWEBHUB we believe great websites are the result of disciplined
              craft, not luck. In this article we break down the approach our team
              uses on every {post.category.toLowerCase()} engagement.
            </p>
            <h2 className="font-display text-2xl font-bold text-ink">Start with the outcome</h2>
            <p>
              Before a single pixel is drawn, we map the business goal. Everything
              from information architecture to color contrast rolls up to that
              objective — keeping the build focused and measurable.
            </p>
            <h2 className="font-display text-2xl font-bold text-ink">Build in the open</h2>
            <p>
              Frequent, clickable previews mean fewer surprises and faster
              feedback. Clients see progress weekly, not at the finish line.
            </p>
            <blockquote className="border-l-4 border-master bg-master-50/40 px-5 py-4 font-medium text-ink">
              “Speed is a feature. Accessibility is a requirement. Both are
              non-negotiable at SWAWEBHUB.”
            </blockquote>
            <h2 className="font-display text-2xl font-bold text-ink">Measure and iterate</h2>
            <p>
              After launch we watch real user data and tune. This loop is where
              good sites become great ones.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 border-t border-ink/10 pt-8">
          <h3 className="mb-6 font-display text-xl font-bold">Related articles</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/blog/${r.id}`}
                className="group rounded-2xl border border-ink/5 p-4 transition-all hover:border-master/40 hover:shadow-card"
              >
                <div className="text-3xl">{r.emoji}</div>
                <div className="mt-2 text-sm font-semibold group-hover:text-darkgreen">
                  {r.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CTA
        title="Enjoyed this read?"
        subtitle="Let's put these ideas to work on your own website."
      />
    </article>
  );
}

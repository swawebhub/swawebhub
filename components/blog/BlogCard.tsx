import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { readingTime, categoryEmoji } from "@/lib/wordpress";

export type BlogPostCard = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
  imageAlt?: string;
  categories: string[];
  tags: string[];
  readingMinutes?: number;
};

export function BlogCard({ post, index = 0 }: { post: BlogPostCard; index?: number }) {
  const minutes = post.readingMinutes ?? readingTime(post.excerpt + " " + post.title);
  const category = post.categories[0];
  const emoji = categoryEmoji(category);

  return (
    <Reveal delay={index * 100}>
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-master/40 hover:shadow-glow">
        <Link href={`/blog/${post.slug}`} className="block h-44 w-full overflow-hidden bg-master-50/60 relative">
          {post.image ? (
            <img
              src={`/api/proxy-image?url=${encodeURIComponent(post.image)}`}
              alt={post.imageAlt || post.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="grid h-full place-items-center text-5xl select-none">{emoji}</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {category && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-darkgreen shadow-sm backdrop-blur-sm">
              <span>{emoji}</span>
              <span>{category}</span>
            </span>
          )}
        </Link>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between text-xs text-ink/50">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-master-50 px-2 py-0.5 font-medium text-darkgreen">
                📅 {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span className="inline-flex items-center gap-1">
                ⏱️ {minutes} min read
              </span>
            </div>
          </div>

          <Link href={`/blog/${post.slug}`} className="mt-3 block">
            <h3 className="font-display text-lg font-bold leading-snug transition-colors group-hover:text-darkgreen line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="mt-2 flex-1 text-sm text-ink/60 line-clamp-3">{post.excerpt}</p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-master text-sm font-bold text-ink">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-medium text-ink/70">{post.author}</span>
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-darkgreen opacity-0 transition-all duration-300 group-hover:opacity-100"
            >
              Read <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-medium text-ink/60">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

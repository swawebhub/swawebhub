"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { CTA } from "@/components/ui/CTA";
import { fetchPostBySlug, fetchComments, categoryEmoji, readingTime } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url = `https://www.swawebhub.com/blog/${slug}`;
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareItems = [
    { label: "Copy Link", icon: "🔗", action: "copy" as const },
    { label: "X / Twitter", icon: "𝕏", href: `https://x.com/intent/post?url=${encoded}&text=${encodedTitle}` },
    { label: "Facebook", icon: "📘", href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}` },
    { label: "LinkedIn", icon: "💼", href: `https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}` },
    { label: "WhatsApp", icon: "💬", href: `https://wa.me/?text=${encodedTitle}%20${encoded}` },
  ];

  return (
    <div className="mt-10 rounded-3xl border border-ink/5 bg-white p-6 shadow-sm">
      <h4 className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
        <span>🔗</span> Share this article
      </h4>
      <div className="flex flex-wrap gap-2">
        {shareItems.map((item) => (
          <div key={item.label}>
            {item.action === "copy" ? (
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(url);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-master-50 px-4 py-2 text-sm font-semibold text-darkgreen transition-all duration-300 hover:border-master hover:shadow-md active:scale-95"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ) : (
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-master-50 px-4 py-2 text-sm font-semibold text-darkgreen transition-all duration-300 hover:border-master hover:shadow-md active:scale-95"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export { ShareButtons };

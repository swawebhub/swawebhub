"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Post } from "@/lib/post";

export function PostsManager({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const haystack = [p.title, p.category, p.author, ...(p.tags ?? [])]
        .filter((v): v is string => Boolean(v))
        .map((v) => v.toLowerCase());
      return haystack.some((v) => v.includes(q));
    });
  }, [posts, query]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Delete failed");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusyId(null);
    }
  }

  const field =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-master focus:ring-2 focus:ring-master/30";

  return (
    <div className="mt-8">
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="mb-4 max-w-sm">
        <input
          className={field}
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-ink/60">No posts found.</p>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/5 bg-ink/5 text-xs uppercase tracking-wide text-ink/60">
              <tr>
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {filtered.map((p) => {
                const id = String(p._id);
                return (
                  <tr key={id} className="hover:bg-ink/5">
                    <td className="px-5 py-4 font-semibold text-ink">{p.title}</td>
                    <td className="px-5 py-4 text-ink/70">{p.category || "—"}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          p.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-ink/70">{p.date?.slice(0, 10) || "—"}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/posts/${id}`} className="btn-outline text-xs">
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(id)}
                          disabled={busyId === id}
                          className="btn-outline border-red-300 text-xs text-red-600 disabled:opacity-60"
                        >
                          {busyId === id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

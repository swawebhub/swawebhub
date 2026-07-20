"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Post, Category } from "@/lib/post";
import { slugify } from "@/lib/post";
import { ClassicEditor } from "@/components/admin/ClassicEditor";

type Props = { post?: Post };

export function PostEditor({ post }: Props) {
  const router = useRouter();
  const isEdit = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [description, setDescription] = useState(post?.description ?? "");
  const [image, setImage] = useState(post?.image ?? "");
  const [category, setCategory] = useState(post?.category ?? "");
  const [tags, setTags] = useState((post?.tags ?? []).join(", "));
  const [author, setAuthor] = useState(post?.author ?? "Swarup Roy");
  const [date, setDate] = useState(
    post?.date ? post.date.slice(0, 10) : new Date().toISOString().slice(0, 10)
  );
  const [emoji, setEmoji] = useState(post?.emoji ?? "");

  const [categories, setCategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "ok" | "err"; msg: string }>({
    type: "idle",
    msg: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) setCategories(d.categories ?? []);
      })
      .catch(() => {});
  }, []);

  function autoSlugBase() {
    if (slug.trim()) return;
    setSlug(slugify(title) || "");
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setStatus({ type: "idle", msg: "" });
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setStatus({ type: "err", msg: data?.error || "Upload failed" });
        return;
      }
      setImage(data.url);
    } catch {
      setStatus({ type: "err", msg: "Upload failed" });
    } finally {
      setUploading(false);
    }
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = "Title is required.";
    if (!excerpt.trim()) next.excerpt = "Excerpt is required.";
    if (!description.trim()) next.description = "Content is required.";
    if (!author.trim()) next.author = "Author is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit(statusValue: "draft" | "published") {
    setStatus({ type: "idle", msg: "" });
    if (!validate()) return;

    setBusy(true);
    try {
      const finalSlug = slugify(slug || title);
      const body = {
        title: title.trim(),
        slug: finalSlug,
        excerpt: excerpt.trim(),
        description,
        image: image || undefined,
        category: category || undefined,
        tags,
        author: author.trim(),
        date: date ? new Date(date).toISOString() : undefined,
        status: statusValue,
        emoji: emoji || undefined,
      };

      const url = isEdit && post ? `/api/posts/${String(post._id)}` : "/api/posts";
      const method = isEdit && post ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setStatus({ type: "err", msg: data?.error || "Save failed" });
        return;
      }
      setStatus({ type: "ok", msg: statusValue === "published" ? "Published." : "Saved as draft." });
      router.push("/admin/posts");
      router.refresh();
    } catch {
      setStatus({ type: "err", msg: "Network error. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  const field =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-master focus:ring-2 focus:ring-master/30";
  const label = "mb-1.5 block text-sm font-semibold text-ink/80";
  const err = (k: string) =>
    errors[k] ? <p className="mt-1 text-xs text-red-600">{errors[k]}</p> : null;

  return (
    <div className="container-x py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="eyebrow">Admin</span>
          <h1 className="mt-2 font-display text-3xl font-bold">
            {isEdit ? "Edit post" : "New post"}
          </h1>
        </div>
        <button type="button" onClick={() => router.push("/admin/posts")} className="btn-outline text-sm">
          Back to posts
        </button>
      </div>

      {status.type !== "idle" && (
        <div
          className={`mb-4 rounded-xl px-4 py-3 text-sm ${
            status.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {status.msg}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className={label} htmlFor="title">Title *</label>
          <input
            id="title"
            className={field}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={autoSlugBase}
          />
          {err("title")}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="slug">Slug</label>
            <input
              id="slug"
              className={field}
              placeholder="auto-generated"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <p className="mt-1 text-xs text-ink/50">Leave blank to auto-generate from title.</p>
          </div>
          <div>
            <label className={label} htmlFor="emoji">Emoji (optional)</label>
            <input
              id="emoji"
              className={field}
              maxLength={4}
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="excerpt">Excerpt *</label>
          <textarea
            id="excerpt"
            rows={2}
            className={field}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
          {err("excerpt")}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="category">Category</label>
            <input
              id="category"
              list="category-list"
              className={field}
              placeholder="Select or type"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <datalist id="category-list">
              {categories.map((c) => (
                <option key={String(c._id)} value={c.name} />
              ))}
            </datalist>
          </div>
          <div>
            <label className={label} htmlFor="tags">Tags (comma separated)</label>
            <input
              id="tags"
              className={field}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={label}>Featured Image</label>
          <div className="flex flex-wrap items-center gap-3">
            <label className="btn-outline cursor-pointer text-sm">
              {uploading ? "Uploading..." : "Upload"}
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
            <input
              className={field}
              placeholder="Or paste image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="Preview" className="mt-3 h-32 rounded-xl border border-ink/10 object-cover" />
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="author">Author *</label>
            <input
              id="author"
              className={field}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            {err("author")}
          </div>
          <div>
            <label className={label} htmlFor="date">Publish Date</label>
            <input
              id="date"
              type="date"
              className={field}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={label}>Content *</label>
          <ClassicEditor value={description} onChange={setDescription} />
          {err("description")}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => submit("draft")}
            disabled={busy}
            className="btn-outline disabled:opacity-60"
          >
            {busy ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={() => submit("published")}
            disabled={busy}
            className="btn-primary disabled:opacity-60"
          >
            {busy ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}

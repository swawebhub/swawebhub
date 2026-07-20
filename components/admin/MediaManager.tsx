"use client";

import { useRef, useState } from "react";

type MediaItem = { url: string; publicId?: string };

export function MediaManager() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of files) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: form });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.ok) {
          setError(data?.error || "Upload failed");
          continue;
        }
        setItems((prev) => [{ url: data.url, publicId: data.publicId }, ...prev]);
      }
    } catch {
      setError("Network error.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function copy(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mt-8">
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <label className="btn-primary cursor-pointer disabled:opacity-60">
          {uploading ? "Uploading..." : "Upload image"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
        <span className="text-xs text-ink/50">
          {items.length} image{items.length === 1 ? "" : "s"} in this session
        </span>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-ink/60">No images uploaded in this session yet.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={`${item.url}-${i}`} className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt="Uploaded" className="h-36 w-full object-cover" />
              <div className="flex items-center justify-between gap-2 p-3">
                <button
                  type="button"
                  onClick={() => copy(item.url)}
                  className="btn-outline text-xs"
                >
                  {copied === item.url ? "Copied!" : "Copy URL"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

export function CommentForm({ postId, replyTo, onPosted }: { postId: number; replyTo?: string; onPosted?: () => void }) {
  const [saving, setSaving] = useState(false);

  return (
    <form
      id="comment-form"
      className="mt-4 rounded-2xl border border-ink/5 bg-white p-5 shadow-sm"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        setSaving(true);
        await new Promise((r) => setTimeout(r, 600));
        alert("Comment posted! (Demo mode)");
        form.reset();
        setSaving(false);
        onPosted?.();
      }}
    >
      {replyTo && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-master-50 px-3 py-1 text-xs font-semibold text-darkgreen">
          Replying to <span className="font-bold">{replyTo}</span>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-ink/60">Name</label>
          <input
            name="author"
            required
            className="w-full rounded-xl border border-ink/10 bg-master-50/40 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-master focus:ring-2 focus:ring-master/20"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-ink/60">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-ink/10 bg-master-50/40 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-master focus:ring-2 focus:ring-master/20"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1 block text-xs font-semibold text-ink/60">Comment</label>
        <textarea
          name="content"
          required
          rows={4}
          className="w-full rounded-xl border border-ink/10 bg-master-50/40 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-master focus:ring-2 focus:ring-master/20"
          placeholder="Write your thoughts..."
        />
      </div>
      <input type="hidden" name="post" value={postId} />
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {}}
          className="text-xs text-ink/50 underline-offset-4 hover:text-darkgreen hover:underline"
        >
          Save my name for next time
        </button>
        <button
          type="submit"
          disabled={saving}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Posting..." : "Post Comment ✍️"}
        </button>
      </div>
    </form>
  );
}

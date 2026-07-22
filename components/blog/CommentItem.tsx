"use client";

import { useState } from "react";
import { CommentForm } from "./CommentForm";

export function CommentItem({ comment }: { comment: any }) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="rounded-2xl border border-ink/5 bg-white p-5 shadow-sm transition-all duration-300 hover:border-master/30">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-master text-sm font-bold text-ink">
          {comment.author.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">{comment.author}</div>
          <div className="text-xs text-ink/50">
            {new Date(comment.date).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
          </div>
        </div>
      </div>
      <div
        className="mt-3 text-sm leading-relaxed text-ink/70 [&_p]:mb-2 [&_p]:last:mb-0"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
      <button
        type="button"
        onClick={() => setShowReply((v) => !v)}
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-darkgreen opacity-70 transition-all duration-200 hover:opacity-100 hover:underline"
      >
        ↩️ {showReply ? "Cancel reply" : "Reply"}
      </button>
      {showReply && <CommentForm postId={comment.post} replyTo={comment.author} />}
    </div>
  );
}

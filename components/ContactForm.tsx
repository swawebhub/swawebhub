"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-card">
      {sent ? (
        <div className="flex flex-col items-center py-16 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-master-50 text-4xl">
            🎉
          </span>
          <h3 className="mt-5 font-display text-2xl font-bold">Message sent!</h3>
          <p className="mt-2 text-sm text-ink/60">We'll reply shortly.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <input
                required
                className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-master"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                required
                type="email"
                className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-master"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Subject</label>
            <input className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-master" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea
              required
              rows={5}
              className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-master"
            />
          </div>
          <button type="submit" className="btn-master w-full">
            Send Message →
          </button>
        </form>
      )}
    </div>
  );
}

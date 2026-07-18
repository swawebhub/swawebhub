"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name")?.toString() || "",
      email: data.get("email")?.toString() || "",
      subject: data.get("subject")?.toString() || "",
      message: data.get("message")?.toString() || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to send");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

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
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <input
                name="name"
                required
                className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-master"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                name="email"
                required
                type="email"
                className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-master"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Subject</label>
            <input
              name="subject"
              className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-master"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-master"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-master w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Message →"}
          </button>
        </form>
      )}
    </div>
  );
}

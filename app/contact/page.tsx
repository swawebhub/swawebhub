"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { CTA } from "@/components/ui/CTA";

export const dynamic = 'force-static';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Let's talk about your project"
        subtitle="Drop us a message and we'll get back within 24 hours."
        breadcrumb={[{ label: "Contact" }]}
      />
      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-2xl font-bold">Get in touch</h2>
            <div className="space-y-4">
              {[
                { e: "📧", t: "Email", d: "hello@swawebhub.com" },
                { e: "📞", t: "Phone", d: "+1 (555) 000 0000" },
                { e: "📍", t: "Studio", d: "Remote-first, worldwide" },
                { e: "⏰", t: "Hours", d: "Mon–Fri, 9am–6pm" },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-4 rounded-2xl bg-master-50/50 p-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-master-50 text-2xl">
                    {c.e}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{c.t}</div>
                    <div className="text-sm text-ink/60">{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
        </div>
      </section>

      <CTA
        title="Prefer to start a project?"
        subtitle="Open the multistep form and we'll scope it with you in minutes."
      />
    </>
  );
}

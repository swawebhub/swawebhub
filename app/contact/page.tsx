import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CTA } from "@/components/ui/CTA";
import { ContactForm } from "@/components/ContactForm";
import { SITE_URL } from "@/lib/site";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Contact Us — Start Your Project | SWAWEBHUB",
  description:
    "Get in touch with SWAWEBHUB. Drop us a message about your web design, development, or SEO project and we'll reply within 24 hours.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact SWAWEBHUB",
    description: "Start your web project today. Email, phone, or send us a message.",
    url: `${SITE_URL}/contact`,
    siteName: "SWAWEBHUB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
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
                { e: "📧", t: "Email", d: "swa.pro.work1991@gmail.com" },
                { e: "📞", t: "Phone", d: "+91 98043 82734" },
                { e: "📍", t: "Studio", d: "Remote-first, worldwide" },
                { e: "⏰", t: "Hours", d: "Mon–Fri, 9am–6pm" },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-4 rounded-2xl bg-master p-4">
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

          <ContactForm />
        </div>
      </section>

      <CTA
        title="Prefer to start a project?"
        subtitle="Open the multistep form and we'll scope it with you in minutes."
      />
    </>
  );
}

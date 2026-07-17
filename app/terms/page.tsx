import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";

export const metadata = { title: "Terms & Conditions — SWAWEBHUB" };

const sections = [
  { h: "1. Acceptance of terms", p: "By using SWAWEBHUB's website and services, you agree to these Terms & Conditions. If you do not agree, please discontinue use." },
  { h: "2. Services", p: "We provide web design, development, and SEO services as described in individual project agreements and proposals." },
  { h: "3. Payments", p: "Payments are billed per the agreed proposal. Deposits secure scheduling; final payment is due before handoff or launch." },
  { h: "4. Intellectual property", p: "Upon full payment, final deliverables are transferred to the client. SWAWEBHUB retains rights to reusable tools and templates." },
  { h: "5. Limitation of liability", p: "We strive for excellence but are not liable for indirect or consequential damages arising from use of our services." },
  { h: "6. Changes", p: "We may update these terms periodically. Continued use after changes constitutes acceptance." },
];

export const dynamic = 'force-static';

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" subtitle="Last updated: July 2026" breadcrumb={[{ label: "Terms & Conditions" }]} />
      <section className="section bg-white">
        <div className="container-x max-w-3xl space-y-8">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 60}>
              <div>
                <h2 className="font-display text-xl font-bold text-darkgreen">{s.h}</h2>
                <p className="mt-2 text-ink/70">{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA
        title="Ready to work together?"
        subtitle="Start a project and we'll handle the rest, terms included."
      />
    </>
  );
}

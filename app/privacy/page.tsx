import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";

export const metadata = { title: "Privacy Policy — SWAWEBHUB" };

const sections = [
  { h: "1. Information we collect", p: "We collect information you provide directly (name, email, project details) and basic analytics data such as pages visited and device type." },
  { h: "2. How we use information", p: "We use your information to respond to inquiries, deliver services, and improve our website. We never sell your data." },
  { h: "3. Cookies", p: "We use essential cookies for site functionality and optional analytics cookies. You can disable cookies in your browser settings." },
  { h: "4. Data retention", p: "We retain personal data only as long as necessary to provide our services or as required by law." },
  { h: "5. Your rights", p: "You may request access, correction, or deletion of your personal data by contacting hello@swawebhub.com." },
  { h: "6. Contact", p: "Questions about this policy? Reach us via the Contact page and we'll respond promptly." },
];

export const dynamic = 'force-static';

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: July 2026" breadcrumb={[{ label: "Privacy Policy" }]} />
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
        title="Questions about working with us?"
        subtitle="Start a project or reach out — we're happy to help."
      />
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";
import { PricingTabs } from "@/components/PricingTabs";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing — Web Design, Development & SEO Plans | SWAWEBHUB",
  description:
    "Transparent pricing for Web Design, Web Development, and SEO Website services. Compare 9 plans across 3 service tracks and pick the right fit.",
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: "Pricing — SWAWEBHUB",
    description: "Transparent pricing across design, development, and SEO service tracks.",
    url: `${SITE_URL}/pricing`,
    siteName: "SWAWEBHUB",
    type: "website",
  },
};

export const dynamic = 'force-static';

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Simple, honest pricing"
        subtitle="Fixed-scope packages per service. No surprise invoices."
      />
      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <PricingTabs />
          </Reveal>
        </div>
      </section>
      <CTA
        title="Need a custom package?"
        subtitle="Start a project and we'll recommend the right scope for your goals."
      />
    </>
  );
}

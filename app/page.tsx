import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { HowWeWork } from "@/components/home/HowWeWork";
import { StatsBand } from "@/components/home/StatsBand";
import { WhyChoose } from "@/components/home/WhyChoose";
import { TestimonialsSwiper } from "@/components/home/TestimonialsSwiper";
import { LatestPosts } from "@/components/home/LatestPosts";
import { FAQ } from "@/components/home/FAQ";
import { DarkBand } from "@/components/home/DarkBand";
import { CTA } from "@/components/ui/CTA";
import { SITE_URL } from "@/lib/site";
import { autoFocusKeyphrase } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "SWAWEBHUB — Web Design, Development & SEO",
  description:
    "SWAWEBHUB is a senior, design-led studio building modern, high-converting websites with Web Design, Development, and SEO. Start your project today.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "SWAWEBHUB — Web Design, Development & SEO",
    description:
      "Modern, high-converting websites with web design, development, and SEO.",
    url: SITE_URL,
    siteName: "SWAWEBHUB",
    type: "website",
  },
  robots: { index: true, follow: true },
  other: { focus_keyphrase: autoFocusKeyphrase("SWAWEBHUB — Web Design, Development & SEO") },
};

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <WhatWeBuild />
      <StatsBand />
      <HowWeWork />
      <WhyChoose />
      <TestimonialsSwiper />
      <LatestPosts />
      <DarkBand />
      <FAQ />
      <CTA />
    </>
  );
}

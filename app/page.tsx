import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { HowWeWork } from "@/components/home/HowWeWork";
import { StatsBand } from "@/components/home/StatsBand";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Testimonials } from "@/components/home/Testimonials";
import { LatestPosts } from "@/components/home/LatestPosts";
import { FAQ } from "@/components/home/FAQ";
import { DarkBand } from "@/components/home/DarkBand";
import { CTA } from "@/components/ui/CTA";

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
      <Testimonials />
      <LatestPosts />
      <DarkBand />
      <FAQ />
      
      <CTA />
    </>
  );
}

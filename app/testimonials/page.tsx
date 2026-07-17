import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTA } from "@/components/ui/CTA";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Testimonials — Client Reviews & Success Stories | SWAWEBHUB",
  description:
    "See what founders, CTOs, and marketing leaders say about working with SWAWEBHUB. Real reviews from real projects in web design, development, and SEO.",
  alternates: { canonical: `${SITE_URL}/testimonials` },
  openGraph: {
    title: "Testimonials — SWAWEBHUB",
    description: "Real client reviews from web design, development, and SEO projects.",
    url: `${SITE_URL}/testimonials`,
    siteName: "SWAWEBHUB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const testimonials = [
  {
    e: "👩‍💼",
    name: "Sarah Mitchell",
    role: "CEO, Lumina Retail",
    text: "SWAWEBHUB transformed our outdated Shopify store into a blazing-fast, conversion-focused site. Our mobile revenue jumped 40% within the first quarter. The team felt like an extension of our own marketing department.",
    avatar: "SM",
  },
  {
    e: "🧑‍💻",
    name: "James Okonkwo",
    role: "CTO, Northpeak Analytics",
    text: "We inherited a Next.js codebase from SWAWEBHUB and it was the cleanest, best-documented project we've ever taken over. TypeScript everywhere, tests passing, and performance scores in the 98th percentile. Rare to find this level of craft.",
    avatar: "JO",
  },
  {
    e: "👨‍🔧",
    name: "Marcus Bell",
    role: "Founder, Bell Auto Service",
    text: "After years of being invisible on Google, SWAWEBHUB rebuilt our site with SEO baked into the foundation. We went from page 5 to the top 3 for our core keywords. The leads started coming in within 60 days of launch.",
    avatar: "MB",
  },
  {
    e: "👩‍🎨",
    name: "Elena Rodriguez",
    role: "Marketing Director, Vertex SaaS",
    text: "The design quality is outstanding, but what really sets SWAWEBHUB apart is their honesty. They told us when a feature wasn't worth the cost and suggested better alternatives. Our conversion rate is up 35% and we actually understand the roadmap.",
    avatar: "ER",
  },
  {
    e: "🧑‍🚀",
    name: "David Chen",
    role: "Founder, Orbit Logistics",
    text: "From proposal to launch, the process was transparent and collaborative. Weekly previews meant zero surprises at the end. The final site loads in under a second and our bounce rate dropped by half. Exactly what we needed.",
    avatar: "DC",
  },
  {
    e: "👩‍🔬",
    name: "Dr. Aisha Patel",
    role: "Director, MedCore Health",
    text: "We needed a site that was both beautiful and compliant. SWAWEBHUB delivered a design that patients trust and a backend that our legal team approved. The accessibility audit passed on the first try. Highly recommended.",
    avatar: "AP",
  },
  {
    e: "👨‍💼",
    name: "Robert Kim",
    role: "VP Product, Finova Banking",
    text: "SWAWEBHUB didn't just build a website — they built a growth engine. The SEO strategy alone brought us 200+ qualified leads per month. Their team is responsive, skilled, and genuinely invested in our success.",
    avatar: "RK",
  },
  {
    e: "👩‍🏫",
    name: "Lisa Thompson",
    role: "Head of Digital, EduPrime",
    text: "We needed a complete rebrand and a new platform. SWAWEBHUB delivered both on time and on budget. The new site has a 98 Lighthouse score and our enrollment inquiries are up 55%. Worth every penny.",
    avatar: "LT",
  },
  {
    e: "🧑‍⚕️",
    name: "Dr. Michael Osei",
    role: "Clinic Owner, BrightSmile Dental",
    text: "As a small clinic, we needed something professional yet affordable. SWAWEBHUB understood our budget and delivered a site that looks like it belongs to a national brand. Our new patient bookings have tripled.",
    avatar: "MO",
  },
];

export const dynamic = 'force-static';

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Trusted by founders, CTOs & marketing leaders"
        subtitle="Real reviews from real teams who chose SWAWEBHUB to build, grow, and scale their web presence."
        breadcrumb={[{ label: "Testimonials" }]}
      />

      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="What clients say"
            title={<>Results that <span className="text-darkgreen">speak for themselves</span></>}
            subtitle="We let our work and our clients do the talking."
            className="mb-14"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <figure className="card-hover h-full">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-darkgreen text-sm font-bold text-master">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-ink/60">{t.role}</div>
                    </div>
                  </div>
                  <blockquote className="mt-5 text-ink/80 leading-relaxed">
                    “{t.text}”
                  </blockquote>
                  <div className="mt-6 flex items-center gap-1 text-master">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#ffd4002e]">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="By the numbers"
            title={<>Performance you can <span className="text-darkgreen">measure</span></>}
            subtitle="Our clients see real, trackable growth after launch."
            className="mb-14"
          />
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { n: "120+", l: "Sites shipped" },
              { n: "98%", l: "Client retention" },
              { n: "5x", l: "Avg. traffic lift" },
              { n: "40%", l: "Avg. revenue increase" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 100}>
                <div className="card-hover text-center">
                  <div className="font-display text-4xl font-extrabold text-darkgreen sm:text-5xl">
                    {s.n}
                  </div>
                  <div className="mt-2 text-sm text-ink/60">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Ready to write your own success story?"
        subtitle="Start a project and we'll build a site that earns rave reviews and real growth."
      />
    </>
  );
}

"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "What web design and development services does SWAWEBHUB offer?",
    a: "SWAWEBHUB provides professional Web Design, Website Development, Shopify customization, WordPress development, Next.js applications, custom API integration, Technical SEO, website optimization, and ongoing maintenance services."
  },
  {
    q: "Do you build custom websites or use templates?",
    a: "We build fully custom, responsive websites tailored to your business goals. Every project is designed for performance, scalability, user experience, and search engine optimization."
  },
  {
    q: "Do you specialize in Shopify, WordPress, and Next.js development?",
    a: "Yes. We specialize in Shopify store customization, WordPress development, high-performance Next.js applications, custom web solutions, and third-party API integrations."
  },
  {
    q: "Will my website be SEO-friendly and optimized for Google?",
    a: "Absolutely. Every website includes technical SEO, semantic HTML, structured data, Core Web Vitals optimization, mobile responsiveness, and fast loading speeds to improve search engine rankings."
  },
  {
    q: "How long does it take to complete a website project?",
    a: "Most business websites are completed within 2–6 weeks. Larger eCommerce stores, custom web applications, and advanced integrations may require additional development time."
  },
  {
    q: "Can you redesign or improve my existing website?",
    a: "Yes. We redesign outdated websites, improve user experience, increase website speed, enhance SEO, and add modern functionality while preserving your existing content when possible."
  },
  {
    q: "Do you provide API integration and custom functionality?",
    a: "Yes. We integrate payment gateways, CRMs, ERP systems, shipping providers, booking systems, marketing tools, and other third-party APIs to automate and streamline your business."
  },
  {
    q: "Do you offer website maintenance and support after launch?",
    a: "Yes. We provide ongoing website maintenance, security updates, backups, performance optimization, bug fixes, content updates, and technical support to keep your website running smoothly."
  },
  {
    q: "Can you help improve my website's Google ranking?",
    a: "Yes. Our SEO services include technical SEO, on-page optimization, website audits, performance improvements, structured data, keyword optimization, and Core Web Vitals enhancements to increase organic traffic."
  },
  {
    q: "Why should I choose SWAWEBHUB for my website project?",
    a: "We combine creative web design, modern development, Shopify and WordPress expertise, Next.js technology, API integration, and proven SEO strategies to build fast, secure, scalable, and conversion-focused websites that help businesses grow."
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section bg-[#ffd4002e]">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="self-start lg:sticky lg:top-24 h-fit">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Frequently Asked <span className="text-master">Questions</span>
              </>
            }
            subtitle="Find answers to common questions about our web design, web development, Shopify, WordPress, Next.js, API integration, SEO, pricing, and project process."
          />
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 80}>
              <div className="overflow-hidden rounded-2xl border border-ink/5 bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold">{f.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-master text-black transition-transform duration-300 ${
                      open === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-ink/65">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    e: "⚡",
    t: "Fast & High-Performance Websites",
    d: "We build lightning-fast websites optimized for Core Web Vitals, page speed, and exceptional user experiences that improve rankings and conversions."
  },
  {
    e: "🎨",
    t: "Custom Web Design & Development",
    d: "From responsive UI/UX design to Shopify customization, WordPress development, and Next.js applications, every project is tailored to your business."
  },
  {
    e: "🚀",
    t: "SEO-Driven Development",
    d: "Every website is built with technical SEO, semantic HTML, schema markup, and mobile optimization to improve Google visibility and organic traffic."
  },
  {
    e: "🔗",
    t: "Advanced API Integration",
    d: "Seamlessly connect payment gateways, CRMs, ERP systems, third-party APIs, and automation tools to streamline your business operations."
  },
  {
    e: "🛡️",
    t: "Secure & Scalable Solutions",
    d: "Our websites use clean architecture, secure coding standards, and scalable technologies to support your business as it grows."
  },
  {
    e: "🤝",
    t: "Dedicated Support & Transparent Process",
    d: "We provide clear communication, reliable support, timely delivery, and long-term partnerships focused on your business success."
  },
];

export function WhyChoose() {
  return (
    <section className="section bg-darkgreen text-white">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Why Choose SWAWEBHUB"
          title={<>Why Businesses Choose SWAWEBHUB for <span className="text-master">Web Design, Development & SEO</span></>}
          subtitle={
            <span className="text-white">
              We combine creative web design, modern development, Shopify and WordPress expertise, Next.js applications, API integration, and technical SEO to build fast, secure, and conversion-focused websites that help businesses grow.
            </span>
          }
          className="mb-14 md:max-w-[85%] w-full mx-auto"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.t} delay={i * 100}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-master/50 hover:bg-white/10">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-master text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  {r.e}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{r.t}</h3>
                <p className="mt-2 text-sm text-white/65">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

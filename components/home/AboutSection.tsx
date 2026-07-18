import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutSection() {
  return (
    <section className="section bg-white">
      <div className="container-x">
          <SectionHeading
            eyebrow="About SWAWEBHUB"
            title={
              <>
                Your Trusted Partner for{" "}
                <span className="text-master">
                  Web Design, Development & SEO
                </span>
              </>
            }
            subtitle="We create modern, high-performance websites that combine exceptional design, powerful development, and proven SEO strategies to help businesses grow online."
            align="center"
            className="md:max-w-[80%] w-full mx-auto"
          />
        <div className="grid gap-12 lg:grid-cols-2 mt-8">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-[#0f172a] to-black p-8 shadow-2xl">

                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-master/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-darkgreen/20 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-master text-3xl">
                      🚀
                    </div>

                    <div>
                      <h3 className="font-display text-2xl font-bold text-white">
                        SWAWEBHUB
                      </h3>
                      <p className="text-sm text-white/70">
                        Web Design • Development • SEO
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/5 p-4 backdrop-blur">
                      <h4 className="text-3xl font-bold text-master">100+</h4>
                      <p className="text-sm text-white/70">Projects Delivered</p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4 backdrop-blur">
                      <h4 className="text-3xl font-bold text-master">8+</h4>
                      <p className="text-sm text-white/70">Years Experience</p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4 backdrop-blur">
                      <h4 className="text-3xl font-bold text-master">99%</h4>
                      <p className="text-sm text-white/70">Client Satisfaction</p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4 backdrop-blur">
                      <h4 className="text-3xl font-bold text-master">24/7</h4>
                      <p className="text-sm text-white/70">Support</p>
                    </div>
                  </div>
                  <div className="mt-6 text-white">Professional Web Design, Development
& SEO Solutions That Drive Growth.  Building modern digital experiences with speed, SEO, and clean code.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={100}>
            <p className="text-ink/70">
              SWAWEBHUB is a full-service web design and development agency specializing
              in responsive website design, Shopify customization, WordPress development,
              Next.js applications, custom API integration, and technical SEO. We build
              fast, secure, and scalable websites that improve search engine rankings,
              enhance user experience, and convert visitors into loyal customers. Whether
              you're launching a new business or upgrading an existing website, our goal
              is to deliver digital solutions that drive measurable growth and long-term
              success.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Custom Web Design & UI/UX",
                "Shopify & WordPress Development",
                "Next.js & API Integration",
                "Technical SEO & Performance Optimization",
                "Mobile-Responsive Websites",
                "Fast Loading & Core Web Vitals",
                "Secure & Scalable Architecture",
                "Transparent Process & Ongoing Support",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-master text-ink">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/about" className="btn-outline w-fit">
              More about us →
            </Link>
          </Reveal>
        </div>
        </div>
        
      </div>
    </section>
  );
}

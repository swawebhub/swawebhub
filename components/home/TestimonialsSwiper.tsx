"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import "swiper/css";
import "swiper/css/pagination";

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
];

export function TestimonialsSwiper() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title={<>Loved by founders & <span className="text-darkgreen">marketing teams</span></>}
          className="mb-14"
        />
        <Reveal>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
              bulletClass: "swiper-pagination-bullet-custom",
              bulletActiveClass: "swiper-pagination-bullet-custom-active",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name} className="h-full">
                <figure className="card-hover h-full flex flex-col">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-darkgreen text-sm font-bold text-master">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-ink/60">{t.role}</div>
                    </div>
                  </div>
                  <blockquote className="mt-5 text-ink/80 leading-relaxed flex-1 overflow-y-auto max-h-40 custom-scrollbar">
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
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination-custom flex items-center justify-center gap-2 mt-6" />
        </Reveal>
      </div>
    </section>
  );
}

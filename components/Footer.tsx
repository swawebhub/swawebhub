import Link from "next/link";
import { footerPages, services } from "@/lib/site";

export function Footer() {
  const quickLinks = footerPages.slice(0, 4);
  const helpfulLinks = footerPages.slice(4);

  return (
    <footer className="relative bg-ink text-white overflow-hidden">
      {/* Modern gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-master via-master/60 to-transparent" />

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative container-x py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* A) Logo + content + social */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-master text-ink">
                <span className="text-lg font-black">S</span>
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight">
                SWA<span className="text-master">WEBHUB</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              We design, develop, and optimize modern websites that rank, load
              instantly, and convert.
            </p>
            <div className="mt-6 flex gap-3">
              {["🌐", "🐦", "📸", "💼"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="group grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-lg transition-all duration-300 hover:border-master hover:bg-master hover:text-ink hover:-translate-y-1"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* B) Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-master">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((item) => {
                const emoji = item.label.split(" ")[0];
                const text = item.label.split(" ").slice(1).join(" ");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-master"
                    >
                      <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                        {emoji}
                      </span>
                      {text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* C) Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-master">
              Services
            </h4>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-master"
                  >
                    <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                      {s.emoji}
                    </span>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* D) Helpful Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-master">
              Helpful Links
            </h4>
            <ul className="mt-5 space-y-3">
              {helpfulLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-master"
                  >
                    <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                      {item.label.split(" ")[0]}
                    </span>
                    {item.label.split(" ").slice(1).join(" ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* E) Contact Us */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-master">
              Contact Us
            </h4>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href="mailto:hello@swawebhub.com"
                  className="group flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-master"
                >
                  <span className="mt-0.5 text-lg">📧</span>
                  <span className="leading-snug">
                    hello@swawebhub.com
                    <span className="block text-xs text-white/40 group-hover:text-master/70">
                      Email us anytime
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+15550000000"
                  className="group flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-master"
                >
                  <span className="mt-0.5 text-lg">📞</span>
                  <span className="leading-snug">
                    +1 (555) 000 0000
                    <span className="block text-xs text-white/40 group-hover:text-master/70">
                      Mon–Fri, 9am–6pm
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <span className="mt-0.5 text-lg">📍</span>
                <span className="leading-snug">
                  Remote-first, worldwide
                  <span className="block text-xs text-white/40">
                    Serving clients globally
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} SWAWEBHUB. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <span className="text-master">❤</span> using Next.js &
            Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

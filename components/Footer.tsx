import Link from "next/link";
import { footerPages } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-darkgreen text-white">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-master text-ink">
              <span className="text-lg font-black">S</span>
            </span>
            <span className="font-display text-xl font-extrabold">
              SWA<span className="text-master">WEBHUB</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-white/70">
            We design, develop, and optimize modern websites that rank, load
            instantly, and convert. Your project, our obsession.
          </p>
          <div className="mt-6 flex gap-3">
            {["🌐", "🐦", "📸", "💼"].map((e) => (
              <a
                key={e}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-lg transition-colors hover:bg-master hover:text-ink"
              >
                {e}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-master">
            Explore
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {footerPages.slice(0, 4).map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="transition-colors hover:text-master">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-master">
            Legal
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {footerPages.slice(4).map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="transition-colors hover:text-master">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} SWAWEBHUB. All rights reserved.</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

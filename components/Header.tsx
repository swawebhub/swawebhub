"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { navItems } from "@/lib/site";
import { StartProjectButton } from "@/components/ui/StartProjectButton";

export function Header() {
  const [drawer, setDrawer] = useState(false);
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-master-600/40 bg-master/80 backdrop-blur-lg shadow-card"
            : "border-transparent bg-master"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link href="/" className="flex items-center gap-2" onClick={() => setDrawer(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-master">
              <span className="text-lg font-black">S</span>
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight text-ink">
              SWA<span className="text-darkgreen">WEBHUB</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {item.label}
                  {item.children && (
                    <svg className="h-3 w-3" fill="currentColor" height="10" width="10" viewBox="0 0 512.011 512.011">
                      <path d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"/>
                    </svg>
                  )}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full w-56 translate-y-2 rounded-2xl border border-ink/5 bg-white p-2 opacity-0 shadow-glow transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-ink/70 transition-colors hover:bg-master hover:text-ink"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center lg:flex">
            <StartProjectButton variant={scrolled ? "black" : "outline"} />
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-master lg:hidden"
            onClick={() => setDrawer(true)}
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </header>

      {/* Mobile Slide Menu — rendered outside header to avoid backdrop-filter containment */}
      <div
        className={`fixed inset-0 z-[60] overflow-hidden lg:hidden ${drawer ? "" : "pointer-events-none"}`}
        aria-hidden={!drawer}
      >
        <div
          className="absolute inset-0 bg-ink/40 transition-opacity duration-300"
          style={{ opacity: drawer ? 1 : 0 }}
          onClick={() => {
            setDrawer(false);
            setSubOpen(null);
          }}
        />
        <aside
          className={`absolute right-0 top-0 flex h-[100dvh] w-[82%] max-w-sm flex-col overflow-hidden bg-white shadow-2xl transition-transform duration-300 ${
            drawer ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Single drawer header */}
          <div className="flex items-center justify-between border-b border-ink/5 px-5 py-4">
            <Link href="/" className="flex items-center gap-2" onClick={() => {
              setDrawer(false);
              setSubOpen(null);
            }}>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-master">
                <span className="text-lg font-black">S</span>
              </span>
              <span className="font-display text-lg font-extrabold">
                SWA<span className="text-darkgreen">WEBHUB</span>
              </span>
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-lg bg-ink/5 text-ink"
              onClick={() => {
                setDrawer(false);
                setSubOpen(null);
              }}
            >
              ✕
            </button>
          </div>

          {/* Sliding area: main list <-> submenu section */}
          <div
            className={`flex w-[200%] flex-1 overflow-hidden transition-transform duration-300 ${
              subOpen ? "-translate-x-1/2" : "translate-x-0"
            }`}
          >
            {/* Main list panel */}
            <div className="flex h-full w-1/2 flex-col">
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {navItems.map((item) => (
                  <div key={item.label} className="border-b border-ink/5">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => !item.children && setDrawer(false)}
                        className="flex-1 px-3 py-3.5 text-base font-medium text-ink"
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          aria-label={`Open ${item.label} submenu`}
                          className="px-4 py-3.5 text-ink"
                          onClick={() => setSubOpen(item.label)}
                        >
                          <svg width="14" height="14" viewBox="0 0 800 800" fill="none">
                            <path d="M193.107 9.77519C180.075 22.8077 180.075 43.8745 193.107 56.907L536.2 400.001L193.107 743.094C180.075 756.126 180.075 777.193 193.107 790.226C206.14 803.258 227.207 803.258 240.239 790.226L606.899 423.566C613.398 417.066 616.665 408.534 616.665 400C616.665 391.465 613.398 382.933 606.899 376.433L240.239 9.77361C227.207 -3.25736 206.14 -3.25734 193.107 9.77519Z" fill="currentColor"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </nav>
              <div className="border-t border-ink/5 p-4">
                <StartProjectButton className="btn-master w-full" />
              </div>
            </div>

            {/* Submenu section (slides in, no separate header) */}
            <div className="flex h-full w-1/2 flex-col bg-[#ffd4002e]">
              <div className="flex items-center gap-2 border-b border-ink/5 bg-darkgreen px-3 py-3">
                <button
                  type="button"
                  aria-label="Back"
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white"
                  onClick={() => setSubOpen(null)}
                >
                  <svg width="20" height="20" viewBox="0 0 512 512" fill="none">
                    <path d="M488.727 233.036H79.4489L202.633 109.973C204.855 107.829 206.628 105.263 207.848 102.427C209.068 99.59 209.71 96.5392 209.737 93.452C209.764 90.3649 209.175 87.3034 208.005 84.446C206.834 81.5887 205.106 78.9928 202.921 76.8098C200.736 74.6268 198.137 72.9004 195.277 71.7313C192.417 70.5623 189.353 69.9741 186.262 70.0009C183.172 70.0277 180.118 70.6691 177.279 71.8876C174.44 73.1061 171.872 74.8773 169.725 77.098L6.81401 239.848C2.451 244.208 0 250.121 0 256.286C0 262.451 2.451 268.363 6.81401 272.723L169.725 435.473C174.114 439.709 179.993 442.052 186.095 441.999C192.197 441.946 198.034 439.501 202.349 435.19C206.664 430.879 209.112 425.048 209.165 418.952C209.218 412.856 206.872 406.983 202.633 402.598L79.4489 279.536H488.727C494.899 279.536 500.819 277.086 505.184 272.726C509.548 268.366 512 262.452 512 256.286C512 250.119 509.548 244.206 505.184 239.845C500.819 235.485 494.899 233.036 488.727 233.036Z" fill="currentColor"/>
                  </svg>
                </button>
                <span className="font-display text-base font-bold text-white">
                  {subOpen}
                </span>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {navItems
                  .find((n) => n.label === subOpen)
                  ?.children?.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      onClick={() => {
                        setDrawer(false);
                        setSubOpen(null);
                      }}
                      className="mb-1 block rounded-xl bg-white px-4 py-3.5 text-base font-medium text-ink shadow-card transition-colors hover:text-master"
                    >
                      {c.label}
                    </Link>
                  ))}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

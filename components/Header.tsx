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
                  {item.children && <span className="text-xs">▾</span>}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full w-56 translate-y-2 rounded-2xl border border-ink/5 bg-white p-2 opacity-0 shadow-glow transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-ink/70 transition-colors hover:bg-master-50 hover:text-darkgreen"
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
                          className="px-4 py-3.5 text-ink/60"
                          onClick={() => setSubOpen(item.label)}
                        >
                          ▾
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
                  ←
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
                      className="mb-1 block rounded-xl bg-white px-4 py-3.5 text-base font-medium text-ink shadow-card transition-colors hover:text-darkgreen"
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

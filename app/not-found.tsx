import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | SWAWEBHUB",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="gradient-hero noise grid min-h-[70vh] place-items-center text-white">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 animate-blob bg-master/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 animate-blob bg-master/10 blur-3xl" />
      <div className="container-x relative text-center">
        <div className="text-6xl">🔍</div>
        <h1 className="mt-6 font-display text-5xl font-extrabold">404</h1>
        <p className="mt-3 text-white/75">We couldn't find that page.</p>
        <Link href="/" className="btn-master mt-8">
          Back home →
        </Link>
      </div>
    </section>
  );
}

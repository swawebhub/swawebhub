import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { StartProjectButton } from "@/components/ui/StartProjectButton";

export function CTA({
  title = "Ready to build something that performs?",
  subtitle = "Start your project in minutes. Our team replies within 24 hours.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <Reveal>
          <div className="gradient-hero noise relative overflow-hidden rounded-[2.5rem] px-8 py-12 text-center text-white sm:px-16">
            <div className="pointer-events-none absolute -left-10 -bottom-10 h-64 w-64 animate-blob bg-master/20 blur-3xl" />
            <span className="text-5xl">🚀</span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">{subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <StartProjectButton className="btn-master" />
              <Link
                href="/contact"
                className="btn border border-white/30 text-white hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

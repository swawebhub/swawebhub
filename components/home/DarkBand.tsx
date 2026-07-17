import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function DarkBand() {
  return (
    <section className="bg-darkgreen text-white">
      <div className="container-x py-20">
        <SectionHeading
          eyebrow="What's Next"
          title={<>Stay ahead with <span className="text-master">fresh insights</span></>}
          subtitle="Tips, trends, and tactics to keep your website performing at its best."
          align="center"
          className="mx-auto"
        />
        <Reveal delay={200}>
          <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
            <a
              href="/blog"
              className="btn bg-white text-darkgreen hover:bg-master hover:text-white"
            >
              Read the Blog
            </a>
            <a
              href="/contact"
              className="btn border border-white/30 text-white hover:bg-white/10"
            >
              Get in Touch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

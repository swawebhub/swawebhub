export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="gradient-hero noise relative overflow-hidden text-white">
      <div className="container-x py-16 text-center sm:py-24">
        <span className="eyebrow bg-white/10 text-master">{eyebrow}</span>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-xl text-white/75">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

import { Breadcrumb } from "./Breadcrumb";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <section className="gradient-hero noise relative overflow-hidden text-white">
      <div className="container-x py-12 text-center sm:py-16">
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex justify-center">
            <Breadcrumb items={breadcrumb} />
          </div>
        )}
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

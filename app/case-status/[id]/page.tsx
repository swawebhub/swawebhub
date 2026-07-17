import Link from "next/link";
import { notFound } from "next/navigation";
import { cases, getCase } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";
import { PageHeader } from "@/components/ui/PageHeader";

export function generateStaticParams() {
  return cases.map((c) => ({ id: c.id }));
}

export const dynamic = 'force-static';

export function generateMetadata({ params }: { params: { id: string } }) {
  const item = getCase(params.id);
  return {
    title: item ? `${item.project} — Case Status` : "Case Status",
    description: item
      ? `Track ${item.project} for ${item.client}. ${item.service} project status, progress, and milestones.`
      : "Track your SWAWEBHUB project in real time.",
    robots: { index: true, follow: true },
  };
}

const statusStyle: Record<string, string> = {
  "In Progress": "bg-master-50 text-darkgreen",
  Review: "bg-blue-50 text-blue-700",
  Completed: "bg-green-50 text-green-700",
  "On Hold": "bg-ink/5 text-ink/60",
};

const milestones = [
  { label: "Discovery & strategy", done: true },
  { label: "Design mockups", done: true },
  { label: "Development", done: false },
  { label: "QA & launch", done: false },
  { label: "Post-launch SEO", done: false },
];

export default function CaseDetailsPage({ params }: { params: { id: string } }) {
  const item = getCase(params.id);
  if (!item) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Case Status"
        title={item.project}
        subtitle={`Client: ${item.client} • ${item.service}`}
        breadcrumb={[
          { label: "Case Status", href: "/case-status" },
          { label: item.project },
        ]}
      />

      <section className="section bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-bold">Progress</h2>
              <div className="mt-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-ink/60">Overall completion</span>
                  <span className="font-semibold text-darkgreen">{item.progress}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full rounded-full bg-master" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-10 font-display text-2xl font-bold">Milestones</h2>
              <ul className="mt-5 space-y-3">
                {milestones.map((m, i) => (
                  <li
                    key={m.label}
                    className="flex items-center gap-4 rounded-2xl border border-ink/5 p-4"
                  >
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-full text-sm font-bold ${
                        m.done ? "bg-darkgreen text-master" : "bg-ink/10 text-ink/40"
                      }`}
                    >
                      {m.done ? "✓" : i + 1}
                    </span>
                    <span className={m.done ? "font-medium" : "text-ink/50"}>{m.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="rounded-3xl border border-ink/10 bg-[#ffd4002e] p-6">
            <h3 className="font-display text-lg font-bold">Case details</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between border-b border-ink/5 pb-3">
                <dt className="text-ink/60">Case ID</dt>
                <dd className="font-semibold">#{item.id.padStart(4, "0")}</dd>
              </div>
              <div className="flex justify-between border-b border-ink/5 pb-3">
                <dt className="text-ink/60">Status</dt>
                <dd className="font-semibold">{item.status}</dd>
              </div>
              <div className="flex justify-between border-b border-ink/5 pb-3">
                <dt className="text-ink/60">Service</dt>
                <dd className="font-semibold">{item.service}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Last update</dt>
                <dd className="font-semibold">{item.updated}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs text-ink/50">
              Need changes? Reach out via the contact page and reference your
              Case ID.
            </p>
          </div>
        </div>
      </section>

      <CTA
        title="Want a case like this?"
        subtitle="Start your project and we'll keep you updated every step of the way."
      />
    </>
  );
}

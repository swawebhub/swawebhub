import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cases } from "@/lib/data";
import { CTA } from "@/components/ui/CTA";

export const metadata = { title: "Case Status — SWAWEBHUB" };

const statusStyle: Record<string, string> = {
  "In Progress": "bg-master-50 text-darkgreen",
  Review: "bg-blue-50 text-blue-700",
  Completed: "bg-green-50 text-green-700",
  "On Hold": "bg-ink/5 text-ink/60",
};

export const dynamic = 'force-static';

export default function CaseStatusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Status"
        title="Track your project in real time"
        subtitle="Enter your case to see live progress, milestones, and updates."
      />
      <section className="section bg-white">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {cases.map((c, i) => (
            <Reveal key={c.id} delay={i * 80}>
              <Link
                href={`/case-status/${c.id}`}
                className="group flex h-full flex-col rounded-3xl border border-ink/5 bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-master/40 hover:shadow-glow"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-master-50 text-3xl">
                    {c.emoji}
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[c.status]}`}>
                    {c.status}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold transition-colors group-hover:text-darkgreen">
                  {c.project}
                </h3>
                <p className="text-sm text-ink/60">Client: {c.client}</p>
                <p className="mt-1 text-xs text-ink/50">{c.service}</p>

                <div className="mt-5">
                  <div className="mb-1 flex justify-between text-xs text-ink/60">
                    <span>Progress</span>
                    <span className="font-semibold text-darkgreen">{c.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
                    <div
                      className="h-full rounded-full bg-master transition-all duration-700"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between text-xs text-ink/50">
                  <span>Updated {c.updated}</span>
                  <span className="font-semibold text-darkgreen">View case →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA
        title="Have a project in mind?"
        subtitle="Start a case with us and track progress just like these."
      />
    </>
  );
}

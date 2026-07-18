"use client";

import { useState, useEffect } from "react";
import { useSidebarForm } from "./SidebarFormProvider";
import { services } from "@/lib/site";

const steps = ["Service", "Details", "Done"] as const;

export function SidebarProjectForm() {
  const { open, closeForm } = useSidebarForm();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // reset when reopened
  useEffect(() => {
    if (open) {
      setStep(0);
      setSubmitted(false);
    }
  }, [open]);

  const canNext = step === 0 ? !!service : form.name && form.email;

  function next() {
    if (step < 2) setStep((s) => s + 1);
  }
  function back() {
    if (step > 0) setStep((s) => s - 1);
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setStep(2);

    const serviceLabel = services.find((s) => s.id === service)?.title || service;

    fetch("/api/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: serviceLabel,
        message: form.message,
      }),
    }).catch((err) => console.error("Project submit error", err));
  }

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeForm}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-darkgreen px-6 py-5 text-white">
          <div>
            <p className="text-xs uppercase tracking-widest text-master">SWAWEBHUB</p>
            <h3 className="font-display text-lg font-bold">Start a Project</h3>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={closeForm}
            className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20"
          >
            ✕
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 px-6 py-4">
          {steps.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div
                className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-colors ${
                  i <= step
                    ? "bg-master text-ink"
                    : "bg-ink/10 text-ink/40"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs font-medium ${
                  i <= step ? "text-ink" : "text-ink/40"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2">
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-sm text-ink/60">Which service do you need?</p>
              {services.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setService(s.id)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                    service === s.id
                      ? "border-master bg-master-50 shadow-glow"
                      : "border-ink/10 hover:border-master/50"
                  }`}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-master-50 text-2xl">
                    {s.emoji}
                  </span>
                  <span>
                    <span className="block font-semibold">{s.title}</span>
                    <span className="block text-xs text-ink/60">{s.desc}</span>
                  </span>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <form id="project-form" onSubmit={submit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Full Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none transition focus:border-master"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none transition focus:border-master"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 555 000 0000"
                  className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none transition focus:border-master"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none transition focus:border-master"
                />
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-master-50 text-4xl">
                🎉
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold">
                {submitted ? "Request Received!" : "All set"}
              </h3>
              <p className="mt-2 max-w-xs text-sm text-ink/60">
                Thanks {form.name || "there"}! Our team will reach out within 24
                hours to kick off your project.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-ink/5 px-6 py-4">
          {step > 0 && step < 2 && (
            <button type="button" onClick={back} className="btn-outline flex-1">
              Back
            </button>
          )}
          {step === 0 && (
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              className="btn-master flex-1 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          )}
          {step === 1 && (
            <button type="submit" form="project-form" className="btn-master flex-1">
              Submit Request
            </button>
          )}
          {step === 2 && (
            <button type="button" onClick={closeForm} className="btn-dark flex-1">
              Close
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

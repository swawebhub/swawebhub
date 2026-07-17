"use client";

import { useSidebarForm } from "@/components/sidebar/SidebarFormProvider";

export function StartProjectButton({
  className,
  label = "Start a Project",
  variant = "master",
}: {
  className?: string;
  label?: string;
  variant?: "master" | "black" | "outline";
}) {
  const { openForm } = useSidebarForm();
  const cls =
    className ??
    (variant === "black"
      ? "btn bg-ink text-master hover:-translate-y-0.5"
      : variant === "outline"
      ? "btn border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-master"
      : "btn-master");
  return (
    <button type="button" onClick={openForm} className={cls}>
      {label}
      <span aria-hidden>→</span>
    </button>
  );
}

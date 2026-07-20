import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  return (
    <div className="container-x py-8">
      <span className="eyebrow">Admin</span>
      <h1 className="mt-2 font-display text-3xl font-bold">Settings</h1>
      <SettingsForm />
    </div>
  );
}

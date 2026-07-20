"use client";

import { useEffect, useState } from "react";

export function SettingsForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const [siteName, setSiteName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [localMsg, setLocalMsg] = useState<string | null>(null);

  useEffect(() => {
    setSiteName(localStorage.getItem("siteName") ?? "SWAWEBHUB");
    setLogoUrl(localStorage.getItem("logoUrl") ?? "");
  }, []);

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (newPassword.length < 6) {
      setMsg({ type: "err", text: "Password must be at least 6 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMsg({ type: "err", text: "Passwords do not match." });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setMsg({ type: "err", text: data?.error || "Failed to change password." });
        return;
      }
      setMsg({ type: "ok", text: "Password changed successfully." });
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setMsg({ type: "err", text: "Network error." });
    } finally {
      setBusy(false);
    }
  }

  function saveLocal() {
    localStorage.setItem("siteName", siteName);
    localStorage.setItem("logoUrl", logoUrl);
    setLocalMsg("Site settings saved.");
    setTimeout(() => setLocalMsg(null), 2000);
  }

  const field =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-master focus:ring-2 focus:ring-master/30";
  const label = "mb-1.5 block text-sm font-semibold text-ink/80";

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-card sm:p-8">
        <h2 className="font-display text-xl font-bold">Change Password</h2>
        {msg && (
          <div
            className={`mt-3 rounded-xl px-4 py-3 text-sm ${
              msg.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {msg.text}
          </div>
        )}
        <form onSubmit={changePassword} className="mt-4 space-y-4">
          <div>
            <label className={label} htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              className={field}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label className={label} htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className={field}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
            {busy ? "Saving..." : "Change Password"}
          </button>
        </form>
      </div>

      <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-card sm:p-8">
        <h2 className="font-display text-xl font-bold">Site Settings</h2>
        <p className="mt-1 text-xs text-ink/50">Stored locally in your browser.</p>
        {localMsg && (
          <div className="mt-3 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{localMsg}</div>
        )}
        <div className="mt-4 space-y-4">
          <div>
            <label className={label} htmlFor="siteName">Site Name</label>
            <input
              id="siteName"
              className={field}
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>
          <div>
            <label className={label} htmlFor="logoUrl">Logo URL</label>
            <input
              id="logoUrl"
              className={field}
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
            />
          </div>
          <button type="button" onClick={saveLocal} className="btn-outline">
            Save settings
          </button>
        </div>
      </div>
    </div>
  );
}

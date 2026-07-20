"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { LoginForm } from "@/components/admin/LoginForm";
import { ToastProvider } from "@/components/ui/Toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (!cancelled) {
          const authed = !!data?.authenticated;
          setAuthenticated(authed);
          if (!authed && !isLogin) {
            router.replace("/admin/login");
          }
        }
      } catch {
        if (!cancelled) {
          setAuthenticated(false);
          if (!isLogin) {
            router.replace("/admin/login");
          }
        }
      }
    }
    checkAuth();
    return () => {
      cancelled = true;
    };
  }, [isLogin, router]);

  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-sm text-ink/60">Loading...</div>
      </div>
    );
  }

  if (isLogin) {
    return (
      <ToastProvider>
        <LoginForm />
      </ToastProvider>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <div className="text-sm text-white/60">Redirecting to login...</div>
      </div>
    );
  }

  const active = pathname.split("/").pop() || "dashboard";
  return <AdminShell active={active}>{children}</AdminShell>;
}

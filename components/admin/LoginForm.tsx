"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";

export function LoginForm() {
  const router = useRouter();
  const { show } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, rememberMe }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        show(data?.error || "Invalid username or password.", "error");
        return;
      }
      show("Login successful! Redirecting...", "success");
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1200);
    } catch {
      show("Network error. Please try again.", "error");
    } finally {
      setBusy(false);
    }
  }

  const inputBase =
    "peer w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 pt-5 pb-2.5 text-sm text-white outline-none transition-all duration-200 placeholder:text-transparent focus:border-master focus:bg-white/[0.08] focus:ring-2 focus:ring-master/20";

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-darkgreen/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-master/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-[400px]">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-darkgreen text-master shadow-glow">
            <span className="text-3xl font-black">S</span>
          </span>
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-white">
              SWA<span className="text-master">WEBHUB</span>
            </h1>
            <p className="mt-1 text-sm text-white/50">Admin Console</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <h2 className="font-display text-xl font-bold text-white">Welcome back</h2>
            <p className="mt-1 text-sm text-white/50">Sign in to manage your content</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              id="username"
              className={inputBase}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              placeholder=" "
            />
            <label
              htmlFor="username"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-medium text-master/70 transition-all duration-200 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:text-master peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-master peer-[:not(:placeholder-shown)]:font-semibold"
            >
              Username
            </label>
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={inputBase + " pr-12"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-medium text-master/70 transition-all duration-200 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:text-master peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-master peer-[:not(:placeholder-shown)]:font-semibold"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-xl text-master transition-colors hover:text-master/80"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.5 10.5a3 3 0 004.5 4.5M6 12a5.96 5.96 0 011.5-3.7M9.9 5.5A11 11 0 0112 5c5.1 0 9.4 3.3 11 8-.5.7-1.2 1.4-2 2M15 12a5.96 5.96 0 01-1.5 3.7" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setRememberMe((v) => !v)}
              className="flex items-center gap-3"
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-200 ${
                  rememberMe
                    ? "border-master bg-master"
                    : "border-white/20 bg-white/[0.06]"
                }`}
              >
                {rememberMe && (
                  <svg className="h-3 w-3 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-sm text-white/70">Remember me</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-master transition-colors hover:text-master/80"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to home
            </Link>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="btn-primary w-full rounded-2xl bg-master py-3.5 text-sm font-semibold text-ink transition-all hover:bg-master/90 hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-60"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {busy ? "Signing in..." : "Sign in"}
            </span>
          </button>
        </form>
      </div>

      <p className="relative mt-6 text-center text-xs text-white/30">
        Protected admin area. Unauthorized access is prohibited.
      </p>
      </div>
    </div>
  );
}

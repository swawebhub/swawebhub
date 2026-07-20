import { NextResponse } from "next/server";
import { ensureDefaultUser, verifyCredentials, signToken } from "@/lib/auth";
import { AUTH_COOKIE, AUTH_MAX_AGE, AUTH_REMEMBER_AGE } from "@/lib/auth-config";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await ensureDefaultUser();
    const body = await request.json().catch(() => ({}));
    const { username, password, rememberMe } = body || {};

    if (!username || !password) {
      return NextResponse.json({ ok: false, error: "Username and password required" }, { status: 400 });
    }

    const valid = await verifyCredentials(username, password);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({ username, role: "admin" });
    const res = NextResponse.json({ ok: true, user: { username, role: "admin" } });
    const maxAge = rememberMe ? AUTH_REMEMBER_AGE : AUTH_MAX_AGE;
    res.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    });
    return res;
  } catch (error) {
    console.error("Login error", error);
    const message = error instanceof Error ? error.message : "Login failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

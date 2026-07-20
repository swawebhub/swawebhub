import { NextResponse } from "next/server";
import { getCurrentUser, changePassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const user = getCurrentUser();
    if (!user) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const newPassword = body?.newPassword;
    if (typeof newPassword !== "string" || newPassword.length < 6) {
      return NextResponse.json(
        { ok: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    await changePassword(user.username, newPassword);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/auth/change-password error", error);
    return NextResponse.json({ ok: false, error: "Failed to change password" }, { status: 500 });
  }
}

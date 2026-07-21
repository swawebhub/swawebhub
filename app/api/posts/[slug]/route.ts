import { NextResponse } from "next/server";
import { fetchPostBySlug } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  try {
    const post = await fetchPostBySlug(params.slug);
    if (!post) {
      return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, post });
  } catch (error) {
    console.error("GET /api/posts/[slug] error", error);
    return NextResponse.json({ ok: false, error: "Failed to load post" }, { status: 500 });
  }
}

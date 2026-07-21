import { NextResponse } from "next/server";
import { fetchPosts, fetchCategories } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params: Record<string, string | number> = {
      page: Number(searchParams.get("page") || 1),
      per_page: Math.min(Number(searchParams.get("limit") || 12), 100),
    };

    const category = searchParams.get("category");
    const tagParam = searchParams.get("tag");
    const search = searchParams.get("search");

    if (category) {
      const cats = await fetchCategories();
      const matched = cats.find(
        (c) => c.slug === category || c.name.toLowerCase() === category.toLowerCase()
      );
      if (matched) params.categories = String(matched.id);
    }
    if (tagParam) params.tags = String(tagParam);
    if (search) params.search = search;

    const posts = await fetchPosts(params);
    return NextResponse.json({
      ok: true,
      posts,
      total: posts.length,
      page: Number(params.page),
      limit: Number(params.per_page),
    });
  } catch (error) {
    console.error("GET /api/posts error", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load posts from WordPress" },
      { status: 500 }
    );
  }
}

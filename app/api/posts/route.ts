import { NextResponse } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/mongodb";
import { Post, normalizeTags, slugify } from "@/lib/post";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

function buildFilter(url: URL) {
  const params = url.searchParams;
  const filter: Record<string, unknown> = {};
  const category = params.get("category");
  const tag = params.get("tag");
  const search = params.get("search");
  const status = params.get("status");

  if (category) filter.category = category;
  if (tag) filter.tags = tag;
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }
  return filter;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = buildFilter(new URL(request.url));
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, parseInt(searchParams.get("limit") || "20", 10));
    const skip = (page - 1) * limit;

    const db = await getDb();
    const total = await db.collection<Post>(COLLECTIONS.posts).countDocuments(filter);
    const posts = await db
      .collection<Post>(COLLECTIONS.posts)
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({ ok: true, posts, total, page, limit });
  } catch (error) {
    console.error("GET /api/posts error", error);
    return NextResponse.json({ ok: false, error: "Failed to load posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = getCurrentUser();
    if (!user) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, excerpt, description, image, category, tags, author, date, status, emoji } = body || {};

    if (!title || !excerpt || !description || !author) {
      return NextResponse.json(
        { ok: false, error: "title, excerpt, description and author are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    let slug = slugify(body.slug || title);
    const exists = await db.collection<Post>(COLLECTIONS.posts).findOne({ slug });
    if (exists) slug = `${slug}-${Date.now().toString(36)}`;

    const now = new Date().toISOString();
    const post: Post = {
      title,
      slug,
      excerpt,
      description,
      image: image || undefined,
      category: category || undefined,
      tags: normalizeTags(tags),
      author,
      date: date || now,
      status: status === "published" ? "published" : "draft",
      comments: [],
      emoji: emoji || undefined,
      views: 0,
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection<Post>(COLLECTIONS.posts).insertOne(post);
    return NextResponse.json({ ok: true, post: { ...post, _id: result.insertedId } }, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts error", error);
    return NextResponse.json({ ok: false, error: "Failed to create post" }, { status: 500 });
  }
}

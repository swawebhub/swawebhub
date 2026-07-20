import { NextResponse } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/mongodb";
import { Post, normalizeTags, slugify } from "@/lib/post";
import { toObjectId } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function resolvePost(idOrSlug: string) {
  const db = await getDb();
  const collection = db.collection<Post>(COLLECTIONS.posts);
  if (idOrSlug.length === 24 && /^[a-f\d]{24}$/i.test(idOrSlug)) {
    return collection.findOne({ _id: toObjectId(idOrSlug) });
  }
  return collection.findOne({ slug: idOrSlug });
}

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  try {
    const db = await getDb();
    const post = await db.collection<Post>(COLLECTIONS.posts).findOne({ slug: params.slug });
    if (!post) {
      return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, post });
  } catch (error) {
    console.error("GET /api/posts/[slug] error", error);
    return NextResponse.json({ ok: false, error: "Failed to load post" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const user = getCurrentUser();
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const db = await getDb();
    const collection = db.collection<Post>(COLLECTIONS.posts);
    const existing = await resolvePost(params.slug);
    if (!existing) return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 });

    const body = await request.json();
    const update: Partial<Post> = { updatedAt: new Date().toISOString() };
    if (body.title !== undefined) update.title = body.title;
    if (body.slug !== undefined) update.slug = slugify(body.slug);
    if (body.excerpt !== undefined) update.excerpt = body.excerpt;
    if (body.description !== undefined) update.description = body.description;
    if (body.image !== undefined) update.image = body.image || undefined;
    if (body.category !== undefined) update.category = body.category || undefined;
    if (body.author !== undefined) update.author = body.author;
    if (body.date !== undefined) update.date = body.date;
    if (body.emoji !== undefined) update.emoji = body.emoji || undefined;
    if (body.status !== undefined) update.status = body.status === "published" ? "published" : "draft";
    if (body.tags !== undefined) update.tags = normalizeTags(body.tags);

    await collection.updateOne({ _id: existing._id }, { $set: update });
    const updated = await collection.findOne({ _id: existing._id });
    return NextResponse.json({ ok: true, post: updated });
  } catch (error) {
    console.error("PUT /api/posts/[slug] error", error);
    return NextResponse.json({ ok: false, error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { slug: string } }) {
  try {
    const user = getCurrentUser();
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const existing = await resolvePost(params.slug);
    if (!existing) return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 });

    const db = await getDb();
    await db.collection<Post>(COLLECTIONS.posts).deleteOne({ _id: existing._id });
    return NextResponse.json({ ok: true, deleted: true });
  } catch (error) {
    console.error("DELETE /api/posts/[slug] error", error);
    return NextResponse.json({ ok: false, error: "Failed to delete post" }, { status: 500 });
  }
}

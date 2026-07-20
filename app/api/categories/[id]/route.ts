import { NextResponse } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/mongodb";
import { Category, slugify } from "@/lib/post";
import { toObjectId } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = getCurrentUser();
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const db = await getDb();
    const existing = await db
      .collection<Category>(COLLECTIONS.categories)
      .findOne({ _id: toObjectId(params.id) });
    if (!existing) return NextResponse.json({ ok: false, error: "Category not found" }, { status: 404 });

    const body = await request.json();
    const update: Partial<Category> = {};
    if (body.name !== undefined) update.name = body.name.toString().trim();
    if (body.slug !== undefined) update.slug = slugify(body.slug);

    await db
      .collection<Category>(COLLECTIONS.categories)
      .updateOne({ _id: existing._id }, { $set: update });
    const updated = await db
      .collection<Category>(COLLECTIONS.categories)
      .findOne({ _id: existing._id });
    return NextResponse.json({ ok: true, category: updated });
  } catch (error) {
    console.error("PUT /api/categories/[id] error", error);
    return NextResponse.json({ ok: false, error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const user = getCurrentUser();
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const db = await getDb();
    const result = await db
      .collection<Category>(COLLECTIONS.categories)
      .deleteOne({ _id: toObjectId(params.id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ ok: false, error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, deleted: true });
  } catch (error) {
    console.error("DELETE /api/categories/[id] error", error);
    return NextResponse.json({ ok: false, error: "Failed to delete category" }, { status: 500 });
  }
}

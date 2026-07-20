import { NextResponse } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/mongodb";
import { Category, slugify } from "@/lib/post";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDb();
    const categories = await db
      .collection<Category>(COLLECTIONS.categories)
      .find({})
      .sort({ name: 1 })
      .toArray();
    return NextResponse.json({ ok: true, categories });
  } catch (error) {
    console.error("GET /api/categories error", error);
    return NextResponse.json({ ok: false, error: "Failed to load categories" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = getCurrentUser();
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const name = (body?.name || "").toString().trim();
    if (!name) {
      return NextResponse.json({ ok: false, error: "Category name required" }, { status: 400 });
    }

    const db = await getDb();
    let slug = slugify(body.slug || name);
    const exists = await db.collection<Category>(COLLECTIONS.categories).findOne({ slug });
    if (exists) slug = `${slug}-${Date.now().toString(36)}`;

    const category: Category = { name, slug, createdAt: new Date().toISOString() };
    const result = await db.collection<Category>(COLLECTIONS.categories).insertOne(category);
    return NextResponse.json(
      { ok: true, category: { ...category, _id: result.insertedId } },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/categories error", error);
    return NextResponse.json({ ok: false, error: "Failed to create category" }, { status: 500 });
  }
}

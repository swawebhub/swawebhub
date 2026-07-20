import { getDb, COLLECTIONS } from "@/lib/mongodb";
import { Category } from "@/lib/post";
import { CategoriesManager } from "@/components/admin/CategoriesManager";

export const dynamic = "force-dynamic";

async function getCategories(): Promise<Category[]> {
  const db = await getDb();
  return db
    .collection<Category>(COLLECTIONS.categories)
    .find({})
    .sort({ name: 1 })
    .toArray();
}

export default async function AdminCategoriesPage() {
  let categories: Category[] = [];
  let error: string | null = null;
  try {
    categories = await getCategories();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load categories";
  }

  return (
    <div className="container-x py-8">
      <span className="eyebrow">Admin</span>
      <h1 className="mt-2 font-display text-3xl font-bold">Categories</h1>
      {error && (
        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not connect to the database: {error}
        </div>
      )}
      {!error && <CategoriesManager categories={categories} />}
    </div>
  );
}

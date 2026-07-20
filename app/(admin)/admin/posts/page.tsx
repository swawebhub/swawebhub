import Link from "next/link";
import { getDb, COLLECTIONS } from "@/lib/mongodb";
import { Post } from "@/lib/post";
import { PostsManager } from "@/components/admin/PostsManager";

export const dynamic = "force-dynamic";

async function getPosts(): Promise<Post[]> {
  const db = await getDb();
  return db
    .collection<Post>(COLLECTIONS.posts)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
}

export default async function AdminPostsPage() {
  let posts: Post[] = [];
  let error: string | null = null;
  try {
    posts = await getPosts();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load posts";
  }

  return (
    <div className="container-x py-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="eyebrow">Admin</span>
          <h1 className="mt-2 font-display text-3xl font-bold">Posts</h1>
        </div>
        <Link href="/admin/posts/new" className="btn-primary">
          + New Post
        </Link>
      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not connect to the database: {error}
        </div>
      )}

      {!error && <PostsManager posts={posts} />}
    </div>
  );
}

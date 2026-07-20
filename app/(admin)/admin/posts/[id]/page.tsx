import { notFound } from "next/navigation";
import { getDb, COLLECTIONS } from "@/lib/mongodb";
import { Post } from "@/lib/post";
import { PostEditor } from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

async function getPost(id: string): Promise<Post | null> {
  const { ObjectId } = await import("mongodb");
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  return db.collection<Post>(COLLECTIONS.posts).findOne({ _id: new ObjectId(id) });
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  if (!post) notFound();

  return <PostEditor post={post} />;
}

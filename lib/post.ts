import type { ObjectId } from "mongodb";

export type PostStatus = "draft" | "published";

export type Comment = {
  _id?: ObjectId;
  author: string;
  email?: string;
  content: string;
  createdAt: string;
};

export type Post = {
  _id?: ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  image?: string;
  category?: string;
  tags: string[];
  author: string;
  date?: string;
  status: PostStatus;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  emoji?: string;
  views?: number;
};

export type Category = {
  _id?: ObjectId;
  name: string;
  slug: string;
  createdAt: string;
};

export type User = {
  _id?: ObjectId;
  username: string;
  password: string;
  role: string;
  createdAt: string;
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string")
    return value.split(",").map((v) => v.trim()).filter(Boolean);
  return [];
}

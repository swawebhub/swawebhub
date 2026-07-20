import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDb, COLLECTIONS } from "@/lib/mongodb";
import type { User } from "@/lib/post";

const COOKIE_NAME = "swa_token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET is not set or too short (min 16 chars).");
  }
  return secret;
}

export type TokenPayload = { username: string; role: string };

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: MAX_AGE });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, getSecret()) as TokenPayload;
  } catch {
    return null;
  }
}

export function getTokenFromCookies(): string | undefined {
  return cookies().get(COOKIE_NAME)?.value;
}

export function getCurrentUser(): TokenPayload | null {
  const token = getTokenFromCookies();
  if (!token) return null;
  return verifyToken(token);
}

export const AUTH_COOKIE = COOKIE_NAME;
export const AUTH_MAX_AGE = MAX_AGE;

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const db = await getDb();
  const user = await db.collection<User>(COLLECTIONS.users).findOne({ username });
  if (!user) return false;
  return bcrypt.compare(password, user.password);
}

export async function ensureDefaultUser() {
  const db = await getDb();
  const users = db.collection<User>(COLLECTIONS.users);
  const count = await users.countDocuments();
  if (count > 0) return;

  const username = process.env.AUTH_USERNAME || "admin";
  const plain = process.env.AUTH_PASSWORD || "admin123";
  const hashed = await bcrypt.hash(plain, 10);
  await users.insertOne({
    username,
    password: hashed,
    role: "admin",
    createdAt: new Date().toISOString(),
  });
}

export async function changePassword(username: string, newPassword: string): Promise<void> {
  const db = await getDb();
  const hashed = await bcrypt.hash(newPassword, 10);
  await db
    .collection<User>(COLLECTIONS.users)
    .updateOne({ username }, { $set: { password: hashed } }, { upsert: true });
}

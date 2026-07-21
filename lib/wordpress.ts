export type WordPressPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  author: string;
  authorUrl?: string;
  image?: string;
  imageAlt?: string;
  categories: string[];
  tags: string[];
  status: string;
  link: string;
  commentStatus: string;
  pingStatus: string;
  metaDescription?: string;
  focusKeyword?: string;
  yoastTitle?: string;
  metaTags?: Record<string, string>;
};

export type WordPressCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
};

export type WordPressTag = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

const WORDPRESS_API_BASE =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\/$/, "") ||
  "https://swa.42web.io/wp-json/wp/v2";

let cfCookie: { value: string; expires: number } | null = null;

async function wpFetch<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T | null> {
  const url = new URL(`${WORDPRESS_API_BASE}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value));
    }
  }

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    if (res.status === 204) return undefined as T;

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return (await res.json()) as T;
    }

    const text = await res.text();
    if (text.includes("slowAES") && text.includes("aes.js")) {
      if (cfCookie && Date.now() < cfCookie.expires) {
        const retryRes = await fetch(url.toString(), {
          next: { revalidate: 60 },
          headers: { Cookie: cfCookie.value },
        });
        if (retryRes.ok) {
          if (retryRes.status === 204) return undefined as T;
          if (retryRes.headers.get("content-type")?.includes("application/json")) {
            return (await retryRes.json()) as T;
          }
        }
      }

      const { solveCloudflareChallenge } = await import("./solvecf");
      const answer = await solveCloudflareChallenge(text);
      if (answer) {
        cfCookie = {
          value: `__test=${answer}`,
          expires: Date.now() + 5 * 60 * 1000,
        };
        const retryRes = await fetch(url.toString(), {
          next: { revalidate: 60 },
          headers: { Cookie: cfCookie.value },
        });
        if (retryRes.ok) {
          if (retryRes.status === 204) return undefined as T;
          const retryText = await retryRes.text();
          if (retryRes.headers.get("content-type")?.includes("application/json")) {
            return JSON.parse(retryText) as T;
          }
        }
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function normalizePost(raw: any): WordPressPost {
  const embedded = raw._embedded || {};
  const media = embedded["wp:featuredmedia"]?.[0];
  const author = embedded.author?.[0];
  const wpTerms: any[][] = embedded["wp:term"] || [];
  let termCategories: any[] = [];
  let termTags: any[] = [];
  for (const terms of wpTerms) {
    if (!Array.isArray(terms) || terms.length === 0) continue;
    const taxonomy = terms[0]?.taxonomy || "";
    if (taxonomy === "category") {
      termCategories = terms;
    } else if (taxonomy === "post_tag") {
      termTags = terms;
    }
  }

  const metaDescription =
    raw.yoast_wpseo_metadesc ||
    (!raw.excerpt?.protected ? stripHtml(raw.excerpt?.rendered || "") : "") ||
    undefined;

  const metaTags: Record<string, string> = {};
  if (Array.isArray(raw.yoast_meta)) {
    for (const tag of raw.yoast_meta) {
      if (tag?.name && tag?.content) {
        metaTags[tag.name] = tag.content;
      }
    }
  }

  return {
    id: Number(raw.id),
    slug: String(raw.slug),
    title: stripHtml(String(raw.title?.rendered || raw.title || "")),
    excerpt: stripHtml(String(raw.excerpt?.rendered || raw.excerpt || "")),
    content: String(raw.content?.rendered || raw.content || ""),
    date: String(raw.date || ""),
    modified: String(raw.modified || ""),
    author: String(author?.name || raw.author || ""),
    authorUrl: author?.url,
    image: media?.source_url || media?.media_details?.sizes?.large?.source_url || media?.media_details?.sizes?.full?.source_url,
    imageAlt: media?.alt_text,
    categories: termCategories.map((c: any) => String(c.name)).filter(Boolean),
    tags: termTags.map((t: any) => String(t.name)).filter(Boolean),
    status: String(raw.status || ""),
    link: String(raw.link || ""),
    commentStatus: String(raw.comment_status || ""),
    pingStatus: String(raw.ping_status || ""),
    metaDescription,
    focusKeyword: raw.yoast_wpseo_focuskw,
    yoastTitle: raw.yoast_title || raw.yoast_wpseo_title,
    metaTags,
  };
}

export async function fetchPosts(params?: {
  page?: number;
  perPage?: number;
  category?: number | string;
  tag?: number | string;
  search?: string;
}): Promise<WordPressPost[]> {
  const query: Record<string, string | number | boolean> = {
    _embed: 1,
    per_page: Math.min(params?.perPage || 20, 100),
    page: Math.max(params?.page || 1, 1),
  };
  if (params?.category) query.categories = String(params.category);
  if (params?.tag) query.tags = String(params.tag);
  if (params?.search) query.search = params.search;

  const data = await wpFetch<any[]>("/posts", query);
  return Array.isArray(data) ? data.map(normalizePost) : [];
}

export async function fetchPostBySlug(slug: string): Promise<WordPressPost | null> {
  const data = await wpFetch<any[]>("/posts", { slug, _embed: 1, per_page: 1 });
  if (!Array.isArray(data) || data.length === 0) return null;
  return normalizePost(data[0]);
}

export async function fetchPostById(id: number): Promise<WordPressPost | null> {
  const data = await wpFetch<any>("/posts", { id: String(id), _embed: 1 });
  if (!data || Array.isArray(data)) return null;
  return normalizePost(data);
}

export async function fetchCategories(): Promise<WordPressCategory[]> {
  const data = await wpFetch<WordPressCategory[]>("/categories", { per_page: 100 });
  return Array.isArray(data) ? data : [];
}

export async function fetchTags(): Promise<WordPressTag[]> {
  const data = await wpFetch<WordPressTag[]>("/tags", { per_page: 100 });
  return Array.isArray(data) ? data : [];
}

export type WordPressComment = {
  id: number;
  post: number;
  author: string;
  authorUrl?: string;
  content: string;
  date: string;
  parent: number;
};

export async function fetchComments(postId: number): Promise<WordPressComment[]> {
  const data = await wpFetch<any[]>("/comments", { post: String(postId), per_page: 100 });
  if (!Array.isArray(data)) return [];
  return data.map((c) => ({
    id: Number(c.id),
    post: Number(c.post),
    author: String(c.author_name || c.author || "Anonymous"),
    authorUrl: c.author_url || undefined,
    content: String(c.content?.rendered || c.content || ""),
    date: String(c.date || ""),
    parent: Number(c.parent || 0),
  }));
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
export async function fetchImageBytes(url: string): Promise<Uint8Array | null> {
  if (!url) return null;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      ...(cfCookie?.value ? { Cookie: cfCookie.value } : {}),
    },
    redirect: "follow",
  });

  const contentType = res.headers.get("content-type") || "";
  let body = Buffer.from(await res.arrayBuffer());

  if (res.status >= 400 || (!contentType.includes("image") && body.length < 2000)) {
    const text = body.toString("utf-8");
    if (text.includes("slowAES") && text.includes("aes.js")) {
      const { solveCloudflareChallenge } = await import("./solvecf");
      const answer = await solveCloudflareChallenge(text);
      if (answer) {
        cfCookie = {
          value: `__test=${answer}`,
          expires: Date.now() + 5 * 60 * 1000,
        };
        const retry = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
            Cookie: cfCookie.value,
          },
          redirect: "follow",
        });
        if (retry.ok && retry.headers.get("content-type")?.includes("image")) {
          return Buffer.from(await retry.arrayBuffer());
        }
      }
    }
    return null;
  }

  return body;
}

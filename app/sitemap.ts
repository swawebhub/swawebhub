import type { MetadataRoute } from "next";
import { cases } from "@/lib/data";
import { services } from "@/lib/site";
import { fetchPosts } from "@/lib/wordpress";

const BASE = "https://www.swawebhub.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/blog",
    "/case-status",
    "/contact",
    "/pricing",
    "/testimonials",
    "/technology",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  let blogRoutes = [
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  try {
    const posts = await fetchPosts({ perPage: 100 });
    blogRoutes = [
      ...blogRoutes,
      ...posts.map((p) => ({
        url: `${BASE}/blog/${p.slug}`,
        lastModified: new Date(p.modified || p.date),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ];
  } catch {
    // keep static blog route if crawl fails
  }

  const caseRoutes = cases.map((c) => ({
    url: `${BASE}/case-status/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...caseRoutes];
}

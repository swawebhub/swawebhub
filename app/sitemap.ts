import type { MetadataRoute } from "next";
import { posts, cases } from "@/lib/data";
import { services } from "@/lib/site";

const BASE = "https://www.swawebhub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/blog",
    "/case-status",
    "/contact",
    "/pricing",
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

  const blogRoutes = posts.map((p) => ({
    url: `${BASE}/blog/${p.id}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const caseRoutes = cases.map((c) => ({
    url: `${BASE}/case-status/${c.id}`,
    lastModified: new Date(c.updated),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...caseRoutes];
}

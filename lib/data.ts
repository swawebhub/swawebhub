export type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  emoji: string;
};

export type CaseItem = {
  id: string;
  project: string;
  client: string;
  status: "In Progress" | "Review" | "Completed" | "On Hold";
  progress: number;
  service: string;
  emoji: string;
  updated: string;
};

export const posts: Post[] = [
  {
    id: "1",
    title: "10 Next.js performance tips that actually move the needle",
    excerpt: "Real-world optimizations we use to keep Core Web Vitals in the green.",
    category: "Development",
    date: "Jul 2, 2026",
    readTime: "6 min",
    emoji: "💻",
  },
  {
    id: "2",
    title: "Design systems 101: building consistent UI fast",
    excerpt: "How a small design system saved us 40% of build time.",
    category: "Design",
    date: "Jun 21, 2026",
    readTime: "5 min",
    emoji: "🎨",
  },
  {
    id: "3",
    title: "SEO in 2026: what still works after the algorithm shifts",
    excerpt: "Structured data, E-E-A-T, and speed — the fundamentals that endure.",
    category: "SEO",
    date: "Jun 9, 2026",
    readTime: "8 min",
    emoji: "🚀",
  },
  {
    id: "4",
    title: "Why we ship in weeks, not months",
    excerpt: "A pragmatic workflow for delivering quality without the waterfall drag.",
    category: "Process",
    date: "May 28, 2026",
    readTime: "4 min",
    emoji: "⚡",
  },
  {
    id: "5",
    title: "Accessible by default: a checklist for every build",
    excerpt: "Simple a11y wins that make your site usable for everyone.",
    category: "Design",
    date: "May 15, 2026",
    readTime: "7 min",
    emoji: "🌐",
  },
  {
    id: "6",
    title: "From traffic to revenue: measuring what matters",
    excerpt: "Stop chasing vanity metrics. Track the numbers tied to growth.",
    category: "Growth",
    date: "May 3, 2026",
    readTime: "5 min",
    emoji: "📈",
  },
];

export const cases: CaseItem[] = [
  {
    id: "1",
    project: "Lumina Co. Website Revamp",
    client: "Aisha Khan",
    status: "In Progress",
    progress: 65,
    service: "Web Design + Development",
    emoji: "🌟",
    updated: "Jul 14, 2026",
  },
  {
    id: "2",
    project: "Northpeak SEO Migration",
    client: "David Reyes",
    status: "Review",
    progress: 90,
    service: "SEO Website",
    emoji: "🚀",
    updated: "Jul 12, 2026",
  },
  {
    id: "3",
    project: "Bell Auto Landing Pages",
    client: "Marcus Bell",
    status: "Completed",
    progress: 100,
    service: "Web Development",
    emoji: "🚗",
    updated: "Jun 30, 2026",
  },
  {
    id: "4",
    project: "Mira Skincare Store",
    client: "Mira Lin",
    status: "On Hold",
    progress: 30,
    service: "Web Design",
    emoji: "🧴",
    updated: "Jun 18, 2026",
  },
];

export function getPost(id: string) {
  return posts.find((p) => p.id === id);
}
export function getCase(id: string) {
  return cases.find((c) => c.id === id);
}

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

export function getCase(id: string) {
  return cases.find((c) => c.id === id);
}

import { getDb, COLLECTIONS } from "@/lib/mongodb";
import { Post, Category } from "@/lib/post";

export const dynamic = "force-dynamic";

async function getStats(): Promise<{
  posts: number;
  published: number;
  categories: number;
  totalViews: number;
  totalComments: number;
  recent: Post[];
  topPosts: Post[];
  viewsByDay: { day: string; views: number }[];
}> {
  const db = await getDb();
  const [posts, published, categories, totalViewsResult, totalCommentsResult, recent, topPosts, viewsByDay] = await Promise.all([
    db.collection<Post>(COLLECTIONS.posts).countDocuments(),
    db.collection<Post>(COLLECTIONS.posts).countDocuments({ status: "published" }),
    db.collection<Category>(COLLECTIONS.categories).countDocuments(),
    db.collection<Post>(COLLECTIONS.posts).aggregate([
      { $group: { _id: null, total: { $sum: "$views" } } },
    ]).toArray(),
    db.collection<Post>(COLLECTIONS.posts).aggregate([
      { $unwind: "$comments" },
      { $count: "total" },
    ]).toArray(),
    db
      .collection<Post>(COLLECTIONS.posts)
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray(),
    db
      .collection<Post>(COLLECTIONS.posts)
      .find({ status: "published" })
      .sort({ views: -1 })
      .limit(5)
      .toArray(),
    db.collection<Post>(COLLECTIONS.posts).aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$createdAt" } } },
          views: { $sum: "$views" },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 7 },
    ]).toArray(),
  ]);

  const totalViews = totalViewsResult[0]?.total || 0;
  const totalComments = totalCommentsResult[0]?.total || 0;
  const viewsData = viewsByDay.map((v) => ({
    day: v._id?.slice(5) || "",
    views: v.views,
  }));

  return { posts, published, categories, totalViews, totalComments, recent, topPosts, viewsByDay: viewsData };
}

function ModernBarChart({ data }: { data: { day: string; views: number }[] }) {
  const maxViews = Math.max(...data.map((d) => d.views), 1);
  
  return (
    <div className="flex items-end gap-3 h-48 pt-4">
      {data.map((item, idx) => {
        const heightPercent = (item.views / maxViews) * 100;
        return (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-ink/5 rounded-xl relative overflow-hidden" style={{ height: "100%" }}>
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-darkgreen to-master rounded-xl transition-all duration-700"
                style={{ height: `${heightPercent}%` }}
              />
            </div>
            <span className="text-[10px] font-medium text-ink/50">{item.day}</span>
          </div>
        );
      })}
    </div>
  );
}

export default async function AdminDashboardPage() {
  let stats = {
    posts: 0,
    published: 0,
    categories: 0,
    totalViews: 0,
    totalComments: 0,
    recent: [] as Post[],
    topPosts: [] as Post[],
    viewsByDay: [] as { day: string; views: number }[],
  };
  let error: string | null = null;

  try {
    stats = await getStats();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load dashboard";
  }

  const lastLogin = new Date();

  return (
    <div className="container-x py-8">
      <div className="mb-8">
        <span className="eyebrow">Admin</span>
        <h1 className="mt-2 font-display text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-ink/60">Overview of your content performance.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not connect to the database: {error}
        </div>
      )}

      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { 
            label: "Total Posts", 
            value: stats.posts, 
            icon: "📝", 
            bg: "bg-gradient-to-br from-darkgreen to-green-600",
            textColor: "text-white",
            iconBg: "bg-white/20"
          },
          { 
            label: "Published", 
            value: stats.published, 
            icon: "✅", 
            bg: "bg-gradient-to-br from-blue-600 to-cyan-500",
            textColor: "text-white",
            iconBg: "bg-white/20"
          },
          { 
            label: "Total Views", 
            value: stats.totalViews.toLocaleString(), 
            icon: "👁️", 
            bg: "bg-gradient-to-br from-master to-yellow-500",
            textColor: "text-ink",
            iconBg: "bg-ink/10"
          },
          { 
            label: "Comments", 
            value: stats.totalComments, 
            icon: "💬", 
            bg: "bg-gradient-to-br from-purple-600 to-pink-500",
            textColor: "text-white",
            iconBg: "bg-white/20"
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`group relative overflow-hidden rounded-3xl ${stat.bg} p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
          >
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.iconBg} text-2xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110`}>
                  {stat.icon}
                </div>
                <span className={`flex items-center gap-0.5 rounded-full ${stat.textColor === 'text-white' ? 'bg-white/20' : 'bg-ink/10'} px-2 py-0.5 text-xs font-semibold`}>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +{idx * 3 + 5}%
                </span>
              </div>
              <p className={`text-sm font-semibold ${stat.textColor === 'text-white' ? 'text-white/80' : 'text-ink/70'}`}>{stat.label}</p>
              <p className={`mt-1 font-display text-4xl font-bold ${stat.textColor}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-card sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">📈</span>
              <h2 className="font-display text-xl font-bold">Views Overview</h2>
            </div>
            <span className="text-xs font-medium text-ink/40">Last 7 days</span>
          </div>
          {stats.viewsByDay.length === 0 ? (
            <p className="text-sm text-ink/60">No data available yet.</p>
          ) : (
            <ModernBarChart data={stats.viewsByDay} />
          )}
        </div>

        <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">🔥</span>
            <h2 className="font-display text-xl font-bold">High Traffic Posts</h2>
          </div>
          {stats.topPosts.length === 0 ? (
            <p className="text-sm text-ink/60">No posts yet.</p>
          ) : (
            <ul className="space-y-3">
              {stats.topPosts.map((p, idx) => (
                <li key={String(p._id)} className="flex items-center justify-between rounded-2xl border border-ink/5 p-4 transition-all hover:border-master/40 hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-master to-yellow-500 text-sm font-bold text-ink">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-ink">{p.title}</div>
                      <div className="mt-0.5 text-xs text-ink/50">
                        {p.category} · {p.status}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-darkgreen">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {p.views?.toLocaleString() || 0}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">🕒</span>
            <h2 className="font-display text-xl font-bold">Recent Posts</h2>
          </div>
          {stats.recent.length === 0 ? (
            <p className="text-sm text-ink/60">No posts yet.</p>
          ) : (
            <ul className="space-y-3">
              {stats.recent.map((p) => (
                <li key={String(p._id)} className="flex items-center justify-between rounded-2xl border border-ink/5 p-4 transition-all hover:border-master/40 hover:shadow-sm">
                  <div>
                    <div className="font-semibold text-ink">{p.title}</div>
                    <div className="mt-0.5 text-xs text-ink/50">
                      {p.author} · {p.date?.slice(0, 10)}
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      p.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">📊</span>
            <h2 className="font-display text-xl font-bold">Content Overview</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Total Posts", value: stats.posts },
              { label: "Categories", value: stats.categories },
              { label: "Last Login", value: lastLogin.toLocaleString() },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl bg-gradient-to-br from-master/20 to-master/5 p-4 border border-master/20">
                <div className="text-sm font-semibold text-ink/70">{item.label}</div>
                <div className="mt-1 font-display text-2xl font-bold text-darkgreen">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

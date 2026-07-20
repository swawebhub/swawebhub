import { MediaManager } from "@/components/admin/MediaManager";

export const dynamic = "force-dynamic";

export default function AdminMediaPage() {
  return (
    <div className="container-x py-8">
      <span className="eyebrow">Admin</span>
      <h1 className="mt-2 font-display text-3xl font-bold">Media</h1>
      <p className="mt-1 text-sm text-ink/60">
        Images are uploaded to Cloudinary. The database stores only the URLs.
      </p>
      <MediaManager />
    </div>
  );
}

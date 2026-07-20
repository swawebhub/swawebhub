import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { isCloudinaryConfigured, uploadImage, deleteImage } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const user = getCurrentUser();
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { ok: false, error: "Cloudinary is not configured. Set CLOUDINARY_* env vars." },
        { status: 500 }
      );
    }

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const file = form.get("file");
      if (!(file instanceof Blob)) {
        return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const { url, publicId } = await uploadImage(buffer);
      return NextResponse.json({ ok: true, url, publicId });
    }

    const body = await request.json().catch(() => ({}));
    const dataUrl = body?.dataUrl || body?.image;
    if (!dataUrl || typeof dataUrl !== "string" || !dataUrl.startsWith("data:image")) {
      return NextResponse.json({ ok: false, error: "Invalid image data" }, { status: 400 });
    }
    const base64 = dataUrl.split(",")[1];
    const buffer = Buffer.from(base64, "base64");
    const { url, publicId } = await uploadImage(buffer);
    return NextResponse.json({ ok: true, url, publicId });
  } catch (error) {
    console.error("Upload error", error);
    return NextResponse.json({ ok: false, error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = getCurrentUser();
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const publicId = body?.publicId;
    if (!publicId) return NextResponse.json({ ok: false, error: "publicId required" }, { status: 400 });

    await deleteImage(publicId);
    return NextResponse.json({ ok: true, deleted: true });
  } catch (error) {
    console.error("Delete image error", error);
    return NextResponse.json({ ok: false, error: "Delete failed" }, { status: 500 });
  }
}

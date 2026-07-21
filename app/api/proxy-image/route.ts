import { NextResponse } from "next/server";
import { fetchImageBytes } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get("url");

    if (!targetUrl) {
      return NextResponse.json({ ok: false, error: "Missing url" }, { status: 400 });
    }

    const data = Buffer.from(await fetchImageBytes(targetUrl) || new Uint8Array(0));
    if (data.length === 0) {
      return NextResponse.json({ ok: false, error: "Failed to fetch image" }, { status: 502 });
    }

    const extension = targetUrl.split(".").pop()?.toLowerCase() || "";
    const contentTypeMap: Record<string, string> = {
      webp: "image/webp",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      svg: "image/svg+xml",
      avif: "image/avif",
    };
    const contentType = contentTypeMap[extension] || "application/octet-stream";

    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, s-maxage=86400, max-age=86400",
        "Content-Length": String(data.length),
      },
    });
  } catch (error) {
    console.error("GET /api/proxy-image error", error);
    return NextResponse.json({ ok: false, error: "Proxy failed" }, { status: 500 });
  }
}

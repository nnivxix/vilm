import { NextResponse, NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  {
    params,
  }: {
    params: { size: string; filename: string };
  }
) {
  const size = params.size;
  const filename = params.filename;

  const basePath = `https://image.tmdb.org/t/p/${size}/${filename}`;
  // const basePath =
  //   "https://image.tmdb.org/t/p/w300/abf8tHznhSvl9BAElD2cQeRr7do.jpg";

  try {
    const response = await fetch(basePath);

    if (!response.ok) {
      return NextResponse.json({
        error: "Failed to fetch image",
        status: response.status,
      });
    }

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";
    const imageBuffer = await response.arrayBuffer();

    return new Response(imageBuffer, {
      status: 200,
      headers: { "Content-Type": contentType },
    });
  } catch (error) {
    return NextResponse.json({
      error: "Internal Server Error",
      details: error,
      status: 500,
    });
  }
}

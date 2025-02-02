import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") || "";

  if (
    userAgent.includes("facebookexternalhit") ||
    userAgent.includes("meta-externalagent")
  ) {
    return new NextResponse("Blocked", { status: 403 });
  }

  return NextResponse.next();
}

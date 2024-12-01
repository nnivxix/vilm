import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  return Response.json({
    route: "api/",
    query: {
      user: searchParams.get("user") || "User not defined",
    },
  });
}

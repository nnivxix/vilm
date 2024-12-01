import config from "@/config";

export async function GET() {
  const { apiUrl, token } = config;

  const response = await fetch(`${apiUrl}/trending/all/day`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    Response.error();
  }

  const data = await response.json();
  return Response.json({
    ...data,
  });
}

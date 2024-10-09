import config from "@/config";

const { apiUrl } = config;

async function fetchAPI<T>(path: string) {
  const res = await fetch(apiUrl + path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
    },
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json as T;
}

export default fetchAPI;

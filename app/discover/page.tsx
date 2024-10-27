import type { Response, MovieTv } from "@/types/response";
import CardItem from "@/components/CardItem";
import { cookies } from "next/headers";
import config from "@/config";
import { Metadata } from "next";

type Status = "idle" | "pending" | "success" | "error";

const { apiUrl, token } = config;

export const metadata: Metadata = {
  title: "Vilm - Discover Movies and Tv Shows ",
  description: "Discover movies and tv shows.",
};

export default async function Page() {
  const { data, status } = await getDiscover();

  if (status === "pending") {
    return "Loading...";
  }
  return (
    <div>
      <div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-5 mx-auto px-5 mt-5">
        {data?.results.map((movie: MovieTv) => (
          <CardItem movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

async function getDiscover(): Promise<{
  data: Response<MovieTv[]> | null;
  status: Status;
  error: string | null;
}> {
  const apiToken = cookies().get("API_TOKEN")?.value ?? token;
  let status: Status = "idle";
  let data: Response<MovieTv[]> | null = null;
  let error: string | null = null;

  status = "pending";
  try {
    const response = await fetch(`${apiUrl}/trending/all/day`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the movie data");
    }

    data = await response.json();
    status = "success";
  } catch (err) {
    console.error(err);
    status = "error";
    error = err instanceof Error ? err.message : "Unknown error";
  }

  return { data, status, error };
}

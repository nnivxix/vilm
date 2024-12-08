import type { Response, MovieTv } from "@/types/response";
import CardItem from "@/components/CardItem";
import { Metadata } from "next";
import config from "@/config";

export const metadata: Metadata = {
  title: "Vilm - Discover Movies and Tv Shows ",
  description: "Discover movies and tv shows.",
};

const { appUrl } = config;

export default async function Page() {
  const data: Response<MovieTv[]> = await getDiscover();

  // TODO: Loading state
  return (
    <div>
      <div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-5 mx-auto px-5 mt-5">
        {data.results?.map((movie: MovieTv) => (
          <CardItem movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

async function getDiscover() {
  try {
    const response = await fetch(`${appUrl}/api/discover`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the movie data");
    }

    const json = await response.json();

    return json;
  } catch (err) {
    console.error(err);
  }
}

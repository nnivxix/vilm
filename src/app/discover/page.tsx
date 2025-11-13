"use client";

import config from "@/config";
import useSWR from "swr";
import CardItem from "@/components/CardItem";
import { MovieTv } from "@/types/response";

const { apiUrl, token } = config;

export default function Page() {
  const { data, error, isLoading } = useSWR("discover", async () => {
    const response = await fetch(`${apiUrl}/trending/all/day`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-5 mx-auto px-5 mt-5">
        {data?.results.map((movie: MovieTv) => (
          <CardItem movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

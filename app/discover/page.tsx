"use client"

import type { Response, MovieTv } from "../../src/types/response";
import useFetch from "@/hooks/useFetch";
import CardItem from "@/components/CardItem";
// import "../../src/index.css";

export default function page() {
  const { data: movies, isLoading } = useFetch<Response<MovieTv[]>>("/trending/all/day");

  if (isLoading) {
    return "Loading..."
  }
  return (
    <div>
      <div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-5 mx-auto px-5 mt-5">
        {movies?.results.map((movie: MovieTv) => (
          <CardItem movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

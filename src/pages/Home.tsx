import { useEffect, useState } from "react";
import type { Response, MovieTv } from "../types/response";
import CardItem from "../components/CardItem";
import { default as dataMovies } from "../data/movies";
import useFetch from "@/hooks/useFetch";

export default function Home() {
	const [movies, setMovies] = useState<MovieTv[]>(dataMovies);
	// const { data } = useFetch<Response<MovieTv[]>>("/trending/all/day");

	// useEffect(() => {
	// 	setMovies(data?.results as MovieTv[]);
	// }, [data, movies]);
	return (
		<div>
			<div className="grid lg:grid-cols-8 grid-cols-2 gap-5  mx-auto px-5 mt-5">
				{movies?.map((movie: MovieTv) => (
					<CardItem movie={movie} key={movie.id} />
				))}
			</div>
		</div>
	);
}

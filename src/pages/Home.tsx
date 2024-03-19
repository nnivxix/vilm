import { useEffect, useState } from "react";
import { Response, Movie } from "../types/response";
import CardItem from "../components/CardItem";
import { default as dataMovies } from "../data/movies";

export default function Home() {
	const [movies, setMovies] = useState<Movie[]>(dataMovies);
	const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

	useEffect(() => {
		// const fetchMovies = async () => {
		// 	const response = await fetch(
		// 		"https://api.themoviedb.org/3/trending/all/day",
		// 		{
		// 			headers: {
		// 				Authorization: "Bearer " + API_TOKEN,
		// 			},
		// 		}
		// 	);
		// 	const data: Response = await response.json();
		// 	setMovies(data.results);
		// };
		// fetchMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div>
			<div className="grid lg:grid-cols-8 grid-cols-2 gap-5  mx-auto px-5 mt-5">
				{movies?.map((movie: Movie) => (
					<CardItem movie={movie} key={movie.id} />
				))}
			</div>
		</div>
	);
}

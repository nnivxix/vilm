import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import type { Movie as MovieType } from "@/types/movie";
import type { Response, SimilarMixed, SimilarMovie } from "@/types/response";
import SimilarCardItem from "@/components/SimilarCardItem";
import { useState } from "react";
import { default as dataMovie } from "@/data/movie";
import { default as similarMoviesData } from "@/data/similar-movies";
import runtimeDuration from "@/utils/runtime-duration";

export default function Movie() {
	const params = useParams();

	// const { data: similarMovies } = useFetch<Response<SimilarMovie[]>>(
	// 	`/movie/${params.id}/similar`
	// );
	// const {
	// 	data: movie,
	// 	isLoading,
	// 	error,
	// } = useFetch<MovieType>(`/movie/${params.id}`);

	const [movie, setMovie] = useState<MovieType>(dataMovie);
	const [similarMovies] = useState(similarMoviesData);

	// if (error) {
	// 	return <pre className="text-white">{error}</pre>;
	// }
	// if (isLoading) {
	// 	return <pre className="text-white">loading...</pre>;
	// }
	const backdropImageUrl =
		"https://image.tmdb.org/t/p/w500/" + movie.backdrop_path;

	return (
		<div className="text-white">
			<div className="w-full bg-no-repeat bg-auto relative h-[85vh] flex">
				<h1>Duration: {runtimeDuration(movie.runtime)} </h1>

				<div className="bg-black/50 w-full -z-10 h-full absolute"></div>
				<img
					src={backdropImageUrl}
					alt=""
					className="-z-20 w-full h-full overflow-clip absolute inset-0 bg-fixed bg-center object-cover object-center"
				/>
			</div>

			<div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-5  mx-auto px-5 mt-5">
				{!!similarMovies?.results?.length &&
					similarMovies?.results?.map((movie) => (
						<SimilarCardItem
							media="movie"
							card={movie as SimilarMixed}
							key={movie.id}
						/>
					))}
			</div>
		</div>
	);
}

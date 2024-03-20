import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import type { Movie as MovieType } from "@/types/movie";
import type { Response, SimilarMovie } from "@/types/response";
import CardItem from "@/components/CardItem";

export default function Movie() {
	const params = useParams();

	const { data: similarMovies } = useFetch<Response<SimilarMovie[]>>(
		`/movie/${params.id}/similar`
	);
	const {
		data: movie,
		isLoading,
		error,
	} = useFetch<MovieType>(`/movie/${params.id}`);

	if (error) {
		return <pre className="text-white">{error}</pre>;
	}
	if (isLoading) {
		return <pre className="text-white">loading...</pre>;
	}

	return (
		<div className="text-white">
			<pre>{params.id}</pre>
			<pre>{movie?.original_title}</pre>
			<p>Similar: {similarMovies?.results.length}</p>

			<div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-5  mx-auto px-5 mt-5">
				{!!similarMovies?.results?.length &&
					similarMovies?.results?.map((movie) => (
						<CardItem media="movie" movie={movie} key={movie.id} />
					))}
			</div>
		</div>
	);
}

import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import type { Movie as MovieType } from "@/types/movie";
import type { Response } from "@/types/response";

export default function Movie() {
	const params = useParams();

	const { data: similarMovies } = useFetch<Response<MovieType[]>>(
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
		</div>
	);
}

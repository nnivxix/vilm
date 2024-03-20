import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import type { Movie as MovieType } from "@/types/movie";
import type { Response } from "@/types/response";

export default function Movie() {
	const params = useParams();
	const [movie, setMovie] = useState<MovieType>();
	const [similar, setSimilar] = useState<MovieType[]>([]);

	const { data: similarData } = useFetch<Response<MovieType[]>>(
		`/movie/${params.id}/similar`
	);
	const { data, isLoading, error } = useFetch<MovieType>(`/movie/${params.id}`);

	useEffect(() => {
		setMovie(data!);
		setSimilar(similarData?.results as MovieType[]);
	}, [movie, similar, similarData, data, isLoading, error]);

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
			<p>Similar: {similar.length}</p>
		</div>
	);
}

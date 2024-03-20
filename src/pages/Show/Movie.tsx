import { Movie as MovieType } from "@/types/movie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";

export default function Movie() {
	const params = useParams();
	const [movie, setMovie] = useState<MovieType>();
	const { data, isLoading, error } = useFetch<MovieType>(`/movie/${params.id}`);

	useEffect(() => {
		setMovie(data!);
	}, [movie, data, isLoading, error]);

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
		</div>
	);
}

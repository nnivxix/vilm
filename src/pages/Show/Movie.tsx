import { Movie as MovieType } from "@/types/movie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "@/config";

export default function Movie() {
	const params = useParams();
	const [movie, setMovie] = useState<MovieType>();
	const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

	useEffect(() => {
		async function getDetailMovie() {
			const response = await fetch(config.apiUrl + "/movie/" + params.id, {
				headers: {
					Authorization: "Bearer " + API_TOKEN,
				},
			});
			const data = await response.json();
			setMovie(data);
		}

		getDetailMovie();
	}, []);
	return (
		<div>
			<pre>{params.id}</pre>
			{!!movie && <pre>{movie.original_title}</pre>}
		</div>
	);
}

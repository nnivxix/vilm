import { Tv as TvType } from "@/types/tv";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Tv() {
	const params = useParams();
	const [tv, setTv] = useState<TvType>();
	const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

	useEffect(() => {
		async function getDetailTv() {
			const response = await fetch(
				"https://api.themoviedb.org/3/tv/" + params.id,
				{
					headers: {
						Authorization: "Bearer " + API_TOKEN,
					},
				}
			);
			const data = await response.json();
			setTv(data);
		}

		getDetailTv();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div>
			<pre>{params.id}</pre>
			{/* <h1>{tv?.name}</h1> */}
			{!!tv && <pre>{tv.name}</pre>}
		</div>
	);
}

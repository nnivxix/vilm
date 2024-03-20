import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import type { Response } from "@/types/response";
import type { Tv as TvType } from "@/types/tv";

export default function Tv() {
	const params = useParams();

	const { data: similarTvs } = useFetch<Response<TvType[]>>(
		`/tv/${params.id}/similar`
	);
	const { data: tv, isLoading, error } = useFetch<TvType>(`/tv/${params.id}`);

	if (error) {
		return <pre className="text-white">{error}</pre>;
	}
	if (isLoading) {
		return <pre className="text-white">loading...</pre>;
	}

	return (
		<div className="text-white">
			<pre>{params.id}</pre>
			<h1>{tv?.name}</h1>
			<h1>Similar Tvs: {similarTvs?.results.length}</h1>
		</div>
	);
}

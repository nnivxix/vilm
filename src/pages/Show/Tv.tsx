import useFetch from "@/hooks/useFetch";
import type { Tv as TvType } from "@/types/tv";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Response } from "@/types/response";

export default function Tv() {
	const params = useParams();
	const [tv, setTv] = useState<TvType | null>(null);
	const [similar, setSimilar] = useState<TvType[]>([]);

	const { data: similarData } = useFetch<Response<TvType[]>>(
		`/tv/${params.id}/similar`
	);
	const { data, isLoading, error } = useFetch<TvType>(`/tv/${params.id}`);

	useEffect(() => {
		setTv(data!);
		setSimilar(similarData?.results as TvType[]);
	}, [data, similar, similarData, tv, error, isLoading]);

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
			<h1>Similar Tvs: {similar.length}</h1>
		</div>
	);
}

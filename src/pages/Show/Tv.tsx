import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import type { Response, SimilarMixed, SimilarTv } from "@/types/response";
import type { Tv as TvType } from "@/types/tv";
import SimilarCardItem from "@/components/SimilarCardItem";

export default function Tv() {
	const params = useParams();

	const { data: similarTvs } = useFetch<Response<SimilarTv[]>>(
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
			<div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-5  mx-auto px-5 mt-5">
				{!!similarTvs?.results?.length &&
					similarTvs?.results?.map((movie) => (
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

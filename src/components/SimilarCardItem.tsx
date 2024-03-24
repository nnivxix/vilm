import type { SimilarMovie, SimilarTv } from "@/types/response";
import { Star } from "lucide-react";

interface SimilarCardItemProps<SimilarType> {
	card: SimilarType;
	media: string;
}

export default function SimilarCardItem<
	SimilarType extends SimilarMovie & SimilarTv
>({ card, media }: SimilarCardItemProps<SimilarType>) {
	const movieTitle = card?.original_title ?? card?.original_name;
	const getYear = () => {
		const date = card.release_date ?? card.first_air_date;
		return date?.split("-")[0] ?? "";
	};

	const mediaType = media;

	return (
		<article
			title={movieTitle}
			className="hover:scale-105 group transition-transform rounded-lg pb-2 relative bg-gray-900 w-auto overflow-hidden"
		>
			<div className="z-30 p-2 text-white absolute hidden group-hover:grid grid-cols-1 bg-black/50 backdrop-blur-sm w-full h-full">
				<h1 className="pb-2 text-xl font-bold">{movieTitle}</h1>
				<p className="line-clamp-6">{card.overview}</p>
				<Button className="mt-3 w-full self-end mb-4 font-bold">
					<Link className="w-full" to={`/show/${mediaType}/${card.id}`}>
						View
					</Link>
				</Button>
			</div>
			<div className="relative">
				<Link to={`/show/${mediaType}/${card.id}`}>
					<img
						src={imageUrl({
							path: card.poster_path,
						})}
						alt={movieTitle}
					/>
				</Link>
				<div className="absolute bottom-1 left-3 ">
					<div className="flex gap-2 flex-wrap">
						{mediaType && (
							<span className="rounded-md  py-1 px-2 text-sm  bg-gray-500 capitalize text-white ">
								{mediaType}
							</span>
						)}
						{card.adult && (
							<span className="rounded-md  py-1 px-2 text-sm  bg-red-500 capitalize text-white ">
								Mature
							</span>
						)}
					</div>
				</div>
			</div>

			<p className="text-lg md:text-xl font-bold text-white px-3 py-2">
				{movieTitle}
			</p>
			<div className="flex justify-between">
				<p className="px-3 md:2xl text-white place-self-end">{getYear()}</p>
				<p className="flex px-3 gap-2 text-white">
					<Star />
					{Math.floor(card.vote_average)}
				</p>
			</div>
		</article>
	);
}

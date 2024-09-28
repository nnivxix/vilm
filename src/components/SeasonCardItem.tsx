import type { Season } from "@/types/tv";
import { Star } from "lucide-react";

interface SeasonCardItemProps {
	season: Season;
}
export default function SeasonCardItem({ season }: SeasonCardItemProps) {
	return (
		<article className="w-full lg:w-3/4 hover:scale-105 group transition-transform rounded-lg pb-2 relative bg-gray-900  overflow-hidden">
			<div className="z-30 p-2 text-white absolute hidden group-hover:grid grid-cols-1 bg-black/50 backdrop-blur-sm w-full h-full">
				<p className="overflow-y-auto">{season.overview ?? ""}</p>
			</div>
			<RImage
				src={imageUrl({ path: season.poster_path, type: "poster" })}
				alt={season.overview ?? ""}
				type="poster"
			/>
			<h1 className="text-lg mt-2  font-bold text-white px-3 lg:py-2">
				{season.name} (E:{season.episode_count})
			</h1>
			<div className="flex lg:flex-row flex-col justify-between px-3 py-2 lg:py-4">
				<p>{getYear(season.air_date)}</p>
				<div className="flex gap-3">
					<Star />
					{Math.floor(season.vote_average)}
				</div>
			</div>
		</article>
	);
}

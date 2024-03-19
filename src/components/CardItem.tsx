import { Movie } from "@/types/response";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

interface CardItemProps {
	movie: Movie;
}
export default function CardItem({ movie }: CardItemProps) {
	const movieTitle = movie.title ?? movie.name;
	const getYear = () => {
		const date = movie.release_date ?? movie.first_air_date;
		return date?.split("-")[0] ?? "";
	};

	return (
		<article
			title={movieTitle}
			className="hover:scale-105 group transition-transform rounded-lg pb-2 relative bg-gray-900 w-auto overflow-hidden"
		>
			<div className="z-30 p-2 text-white absolute hidden group-hover:grid grid-cols-1 bg-black/50 backdrop-blur-sm w-full h-full">
				<h1 className="pb-2 text-xl font-bold">{movieTitle}</h1>
				<p className="line-clamp-6">{movie.overview}</p>
				<Button className="mt-3 w-full self-end mb-4">View</Button>
			</div>
			<div className="relative">
				<img
					src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
					alt={movieTitle}
				/>
				<div className="absolute bottom-1 left-1 flex gap-2">
					<div>
						<span className="rounded-md  py-1 px-2 text-sm  bg-gray-500 capitalize text-white ">
							{movie.media_type}
						</span>
						{movie.adult && (
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
					{Math.floor(movie.vote_average)}
				</p>
			</div>
		</article>
	);
}

import { Movie } from "@/types/response";

interface CardItemProps {
	movie: Movie;
}
export default function CardItem({ movie }: CardItemProps) {
	const movieTitle = movie.title ?? movie.name;
	return (
		<div className="rounded-lg pb-2 bg-gray-900 w-auto overflow-hidden">
			<img
				src={"https://image.tmdb.org/t/p/w300/" + movie.backdrop_path}
				alt={movieTitle}
			/>

			<p className="text-xs md:text-xl font-bold text-white px-3 py-2">
				{movieTitle}
			</p>

			<p className="text-xs px-3 md:2xl text-white">
				{movie.release_date ?? movie.first_air_date}
			</p>
		</div>
	);
}

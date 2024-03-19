import { Movie } from "@/types/response";

interface CardItemProps {
	movie: Movie;
}
export default function CardItem({ movie }: CardItemProps) {
	const movieTitle = movie.title ?? movie.name;
	const getYear = () => {
		const date = movie.release_date ?? movie.first_air_date;
		return date?.split("-")[0];
	};
	return (
		<div
			title={movieTitle}
			className="hover:scale-105 transition-transform rounded-lg pb-2 bg-gray-900 w-auto overflow-hidden"
		>
			<img
				src={"https://image.tmdb.org/t/p/w300/" + movie.backdrop_path}
				alt={movieTitle}
			/>

			<p className="text-xs md:text-xl font-bold text-white px-3 py-2">
				{movieTitle}
			</p>

			<p className="px-3 md:2xl text-white">{getYear()}</p>
		</div>
	);
}

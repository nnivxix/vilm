import { Movie } from "@/types/response";

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
		<div
			title={movieTitle}
			className="hover:scale-105 transition-transform rounded-lg pb-2  bg-gray-900 w-auto overflow-hidden"
		>
			<div className="relative">
				<img
					src={"https://image.tmdb.org/t/p/w300/" + movie.backdrop_path}
					alt={movieTitle}
				/>
				<div className="absolute bottom-1 left-1 flex gap-2">
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

			<p className="text-lg md:text-xl font-bold text-white px-3 py-2">
				{movieTitle}
			</p>

			<p className="px-3 md:2xl text-white place-self-end">{getYear()}</p>
		</div>
	);
}

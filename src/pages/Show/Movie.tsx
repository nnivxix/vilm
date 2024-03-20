import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import type { Backdrop, Images, Movie as MovieType } from "@/types/movie";
import type { Response, SimilarMixed, SimilarMovie } from "@/types/response";
import SimilarCardItem from "@/components/SimilarCardItem";
import { useState } from "react";
import { default as dataMovie } from "@/data/movie";
import { default as similarMoviesData } from "@/data/similar-movies";
import runtimeDuration from "@/utils/runtime-duration";
import imageUrl from "@/utils/image-url";
import movieImages from "@/data/movie-images";
import pickRandomImages from "@/utils/pick-random-images";

export default function Movie() {
	const params = useParams();

	// const { data: similarMovies } = useFetch<Response<SimilarMovie[]>>(
	// 	`/movie/${params.id}/similar`
	// );
	// const {
	// 	data: movie,
	// 	isLoading,
	// 	error,
	// } = useFetch<MovieType>(`/movie/${params.id}`);

	// const { data: images } = useFetch<Images>(
	// 	`/movie/${params.id}/images?include_image_language=null`
	// );

	const [images] = useState<Images>(movieImages);

	const [movie, setMovie] = useState<MovieType>(dataMovie);
	const [similarMovies] = useState(similarMoviesData);

	// if (error) {
	// 	return <pre className="text-white">{error}</pre>;
	// }
	// if (isLoading) {
	// 	return <pre className="text-white">loading...</pre>;
	// }

	return (
		<div className="text-white">
			<div className="w-full bg-no-repeat bg-auto relative h-[85vh] ">
				<div className="grid grid-cols-4 gap-3 mx-60  w-full absolute">
					<h1 className=" col-span-full text-6xl font-semibold ">
						{movie.original_title}{" "}
					</h1>
					<h4 className="col-span-full">
						Duration: {runtimeDuration(movie.runtime)}{" "}
					</h4>
					<p className="col-span-1 text-lg">{movie.overview}</p>
					<div className="flex gap-2 col-span-full">
						{!!movie.genres.length &&
							movie.genres.map((genre) => (
								<span className="p-3 border-2 rounded-md hover:bg-white/20 cursor-pointer">
									{genre.name}
								</span>
							))}
					</div>

					<div className="col-span-full flex ">
						{!!images?.backdrops.length &&
							pickRandomImages(images.backdrops as Backdrop[]).map(
								(image: Backdrop) => (
									<img
										src={imageUrl({ path: image.file_path })}
										alt={image.file_path}
									/>
								)
							)}
					</div>
				</div>

				<div className="bg-black/50 w-full -z-10 h-full absolute"></div>
				<img
					src={imageUrl({ path: movie.backdrop_path, size: "w500" })}
					alt=""
					className="-z-20 w-full h-full overflow-clip absolute inset-0 bg-fixed bg-center object-cover object-center"
				/>
			</div>

			<div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-5  mx-auto px-5 mt-5">
				{!!similarMovies?.results?.length &&
					similarMovies?.results?.map((movie) => (
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

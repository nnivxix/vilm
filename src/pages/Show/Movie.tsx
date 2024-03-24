import { Link, useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import type { Movie as MovieType } from "@/types/movie";
import type { Images, Media, Video } from "@/types/media";
import type { Response, SimilarMixed, SimilarMovie } from "@/types/response";
import type { Provider, ProvidersResponse } from "@/types/providers";
import runtimeDuration from "@/utils/runtime-duration";
import imageUrl from "@/utils/image-url";
import pickRandomImages from "@/utils/pick-random-images";
import getYear from "@/utils/get-year";
import getVideo from "@/utils/get-video";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import SimilarCardItem from "@/components/SimilarCardItem";
import WatchProviderContainer from "@/components/WatchProviderContainer";

export default function Movie() {
	const params = useParams();

	const {
		data: movie,
		isLoading,
		error,
	} = useFetch<MovieType>(`/movie/${params.id}`);
	const { data: similarMovies } = useFetch<Response<SimilarMovie[]>>(
		`/movie/${params.id}/similar`
	);
	const { data: images } = useFetch<Images>(
		`/movie/${params.id}/images?include_image_language=null`
	);
	const { data: videos } = useFetch<Response<Video[]>>(
		`/movie/${params.id}/videos`
	);
	const { data: providers } = useFetch<ProvidersResponse>(
		`/movie/${params.id}/watch/providers`
	);

	if (error) {
		return <pre className="text-white">{error}</pre>;
	}
	if (isLoading) {
		return <pre className="text-white">loading...</pre>;
	}

	return (
		<div className="text-white">
			{!!movie && (
				<div className="w-full bg-no-repeat bg-auto relative flex justify-center items-center h-screen lg:h-[85vh] ">
					<div className="grid grid-cols-4 gap-3 mx-auto absolute max-w-6xl px-3">
						<h1 className=" col-span-full text-6xl font-semibold ">
							{movie.original_title}{" "}
						</h1>
						<h4 className="col-span-full font-semibold">
							Duration: {runtimeDuration(movie.runtime)} |{" "}
							{getYear(movie.release_date)}
						</h4>
						<p className="col-span-full lg:col-span-2 text-lg">
							{movie.overview}
						</p>
						<div className="flex flex-wrap gap-2 col-span-full">
							{!!movie.genres.length &&
								movie.genres.map((genre) => (
									<span
										key={genre.id}
										className="p-3 border-2 border-primary rounded-md hover:bg-white/20 cursor-pointer"
									>
										{genre.name}
									</span>
								))}
						</div>
						{!!images?.backdrops.length && (
							<Carousel className="lg:col-span-full col-span-full ">
								<CarouselContent>
									{pickRandomImages(images.backdrops as Media[], 7).map(
										(image: Media) => (
											<CarouselItem
												key={image.file_path}
												className="basis-1/2 lg:basis-1/3"
											>
												<img
													height={200}
													src={imageUrl({
														path: image.file_path,
														size: "w500",
														type: "backdrop",
													})}
													alt={image.file_path}
												/>
											</CarouselItem>
										)
									)}
								</CarouselContent>
								<CarouselPrevious
									variant={"ghost"}
									className="hidden lg:inline-flex "
								/>
								<CarouselNext
									variant={"ghost"}
									className="hidden lg:inline-flex "
								/>
							</Carousel>
						)}
						{!!videos?.results.length && (
							<Link
								className="px-2 py-2 w-auto col-span-2 lg:col-span-1 text-center rounded-md bg-red-700"
								to={`https://www.youtube.com/watch?v=${
									getVideo(videos?.results)?.key
								}`}
								target="_blank"
							>
								Watch Trailer
							</Link>
						)}
					</div>

					<div className="bg-black/50 w-full -z-10 h-full absolute"></div>
					<img
						src={imageUrl({
							path: movie.backdrop_path,
							size: "w500",
							type: "backdrop",
						})}
						alt=""
						className="-z-20 w-full h-full overflow-clip absolute inset-0 bg-fixed bg-left lg:bg-center object-cover object-left lg:object-center"
					/>
				</div>
			)}

			<WatchProviderContainer providers={providers?.results as Provider} />

			{/* Similar Movies */}

			<div className="grid col-span-4 lg:grid-cols-5 md:grid-cols-4 max-w-6xl grid-cols-2 gap-5  mx-auto px-5 mt-5">
				<h1 className="text-4xl font-semibold col-span-full">
					Similar Movies:{" "}
				</h1>
				{!!similarMovies?.results?.length &&
					similarMovies?.results?.map((movie) => (
						<SimilarCardItem
							media="movie"
							card={movie as SimilarMixed}
							key={movie.id}
						/>
					))}
				{/* TODO: Fallback if similar videos not found */}
			</div>
			<div className="grid-cols-5 gap-2 max-w-7xl mx-auto grid"></div>
		</div>
	);
}

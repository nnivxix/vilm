import { Link, useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import type { Response, SimilarMixed, SimilarTv } from "@/types/response";
import type { Season, Tv as TvType } from "@/types/tv";
import type { Images, Media, Video } from "@/types/media";
import SimilarCardItem from "@/components/SimilarCardItem";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";
import getVideo from "@/utils/get-video";
import imageUrl from "@/utils/image-url";
import pickRandomImages from "@/utils/pick-random-images";
import SeasonCardItem from "@/components/SeasonCardItem";
import WatchProviderContainer from "@/components/WatchProviderContainer";
import { Data } from "@/utils/get-providers";

export default function Tv() {
	const params = useParams();

	const { data: similarTvs } = useFetch<Response<SimilarTv[]>>(
		`/tv/${params.id}/similar`
	);
	const { data: tv, isLoading, error } = useFetch<TvType>(`/tv/${params.id}`);
	const { data: images } = useFetch<Images>(
		`/tv/${params.id}/images?include_image_language=null`
	);
	const { data: videos } = useFetch<Response<Video[]>>(
		`/tv/${params.id}/videos`
	);
	const { data: providers } = useFetch<Data>(
		`/tv/${params.id}/watch/providers`
	);

	if (error) {
		return <pre className="text-white">{error}</pre>;
	}
	if (isLoading) {
		return <pre className="text-white">loading...</pre>;
	}

	return (
		<div className="text-white">
			{!!tv && (
				<div className="w-full bg-no-repeat bg-auto relative flex justify-center items-center h-screen lg:h-[85vh] ">
					<div className="grid grid-cols-4 gap-3 mx-auto absolute max-w-6xl px-3">
						<h1 className=" col-span-full text-6xl font-semibold ">
							{tv?.original_name}{" "}
						</h1>
						<h4 className="col-span-full font-semibold">
							Number of Season: {tv.number_of_seasons} | Number of Episodes:{" "}
							{tv.number_of_episodes}
						</h4>
						<p className="col-span-full lg:col-span-2 text-lg">{tv.overview}</p>
						<div className="flex flex-wrap gap-2 col-span-full">
							{!!tv.genres.length &&
								tv.genres.map((genre) => (
									<span
										key={genre.id}
										className="p-3 border-2 rounded-md hover:bg-white/20 cursor-pointer"
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

					{/* Backgroud */}
					<div className="bg-black/50 w-full -z-10 h-full absolute"></div>
					<img
						src={imageUrl({
							path: tv.backdrop_path,
							size: "w500",
							type: "backdrop",
						})}
						alt=""
						className="-z-20 w-full h-full overflow-clip absolute inset-0 bg-fixed bg-left lg:bg-center object-cover object-left lg:object-center"
					/>
				</div>
			)}

			{/* Show seasons */}
			{!!tv?.seasons.length && (
				<Carousel className=" max-w-6xl grid-cols-5  gap-5  mx-auto px-5 mt-5">
					<h1 className="py-2 text-4xl font-semibold ">Seasons: </h1>
					<CarouselContent className="grid-cols-5">
						{tv.seasons.map((season: Season) => (
							<CarouselItem
								key={season.poster_path}
								className="basis-1/2 lg:basis-1/4"
							>
								<SeasonCardItem season={season} key={season.id} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious
						variant={"ghost"}
						className="hidden lg:inline-flex "
					/>
					<CarouselNext variant={"ghost"} className="hidden lg:inline-flex " />
				</Carousel>
			)}

			<WatchProviderContainer
				providers={providers?.results as Data["results"]}
			/>

			<div className="grid lg:grid-cols-5 max-w-6xl md:grid-cols-4 grid-cols-2 gap-5  mx-auto px-5 mt-5">
				<h1 className="text-4xl font-semibold col-span-full">Similar Tvs: </h1>
				{!!similarTvs?.results?.length &&
					similarTvs?.results?.map((movie) => (
						<SimilarCardItem
							media="tv"
							card={movie as SimilarMixed}
							key={movie.id}
						/>
					))}
			</div>
		</div>
	);
}

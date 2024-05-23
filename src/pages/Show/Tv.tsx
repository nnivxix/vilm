import type { SimilarMixed, TvResponse } from "@/types/response";
import type { Season } from "@/types/tv";
import type { Media } from "@/types/media";
import type { Provider } from "@/types/providers";

export default function Tv() {
  const params = useParams();

  const { data: tv, isLoading, error } = useFetch<TvResponse>(`/tv/${params.id}`,
    {
      append_to_response: "images,videos,watch/providers,account_states,similar",
      language: "en-US",
      include_image_language: "en,null"
    }
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
                    className="p-3 border-2 border-primary rounded-md hover:bg-white/20 cursor-pointer"
                  >
                    {genre.name}
                  </span>
                ))}
            </div>
            {!!tv.images?.backdrops.length && (
              <Carousel className="lg:col-span-full col-span-full ">
                <CarouselContent>
                  {pickRandomImages(tv.images.backdrops as Media[], 7).map(
                    (image: Media) => (
                      <CarouselItem
                        key={image.file_path}
                        className="basis-1/2 lg:basis-1/3"
                      >
                        <Dialog>
                          <DialogTrigger>
                            <RImage
                              height={200}
                              src={imageUrl({
                                path: image.file_path,
                                size: "w500",
                                type: "backdrop",
                              })}
                              type="backdrop"
                              alt={image.file_path}
                            />
                          </DialogTrigger>
                          <DialogContent className="p-0 lg:max-w-7xl" >
                            <RImage
                              height={200}
                              src={imageUrl({
                                path: image.file_path,
                                size: "original",
                                type: "backdrop",
                              })}
                              type="backdrop"
                              alt={image.file_path}
                            />
                          </DialogContent>
                        </Dialog>
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
            {!!tv.videos?.results.length && (
              <PopupYoutubeTrailer
                video={getVideo(tv.videos.results)?.key as string}
              />
            )}
          </div>

          {/* Backgroud */}
          <div className="bg-black/50 w-full -z-10 h-full absolute"></div>
          <RImage
            src={imageUrl({
              path: tv.backdrop_path,
              size: "w500",
              type: "backdrop",
            })}
            alt=""
            type="backdrop"
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

      <WatchProviderContainer providers={tv?.["watch/providers"]?.results as Provider} />

      <div className="grid lg:grid-cols-5 max-w-6xl md:grid-cols-4 grid-cols-2 gap-5  mx-auto px-5 mt-5">
        <h1 className="text-4xl font-semibold col-span-full">Similar Tvs: </h1>
        {tv?.similar?.results?.length ? (
          tv?.similar?.results?.map((movie) => (
            <SimilarCardItem
              media="tv"
              card={movie as SimilarMixed}
              key={movie.id}

            />
          ))) : (
          <div className="text-center py-6 col-span-full text-lg lg:text-xl">
            <p>No Similiar Tv Shows Shown yet.</p>
          </div>

        )}
      </div>
    </div>
  );
}

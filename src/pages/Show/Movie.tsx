import type { Media } from "@/types/media";
import type { MovieResponse, SimilarMixed } from "@/types/response";
import type { Provider } from "@/types/providers";

export default function Movie() {
  const params = useParams();
  const { isAuthenticated } = useAccount()

  const {
    data: movie,
    isLoading,
    error,
  } = useFetch<MovieResponse>(`/movie/${params.id}`, {
    append_to_response: "images,videos,watch/providers,account_states,similar",
    language: "en-US",
    include_image_language: "en,null"
  });


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
            {!!movie.images?.backdrops.length && (
              <Carousel className="lg:col-span-full col-span-full ">
                <CarouselContent>
                  {pickRandomImages(movie.images.backdrops as Media[], 7).map(
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
                          <DialogContent className="p-0 lg:max-w-7xl">
                            <RImage
                              src={imageUrl({
                                path: image.file_path,
                                size: "original",
                                type: "backdrop",
                              })}
                              type="backdrop"
                              alt={image.file_path}
                              className="rounded-lg"
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
            {!!movie.videos?.results.length && (
              <PopupYoutubeTrailer
                video={getVideo(movie.videos.results)?.key as string}
              />
            )}
            {isAuthenticated && (
              <AddToWatchlistButton states={movie.account_states} mediaId={movie.id} type="movie" />
            )}
          </div>

          <div className="bg-black/50 w-full -z-10 h-full absolute"></div>
          <RImage
            src={imageUrl({
              path: movie.backdrop_path,
              size: "w500",
              type: "backdrop",
            })}
            type="backdrop"
            alt={movie.title}
            className="-z-20 w-full h-full overflow-clip absolute inset-0 bg-fixed bg-left lg:bg-center object-cover object-left lg:object-center"
          />
        </div>
      )}

      <WatchProviderContainer providers={movie?.["watch/providers"].results as Provider} />

      {/* Similar Movies */}

      <div className="grid col-span-4 lg:grid-cols-5 md:grid-cols-4 max-w-6xl grid-cols-2 gap-5  mx-auto px-5 mt-5">
        <h1 className="text-4xl font-semibold col-span-full">
          Similar Movies:{" "}
        </h1>
        {movie?.similar?.results?.length ? (
          movie?.similar?.results?.map((movie) => (
            <SimilarCardItem
              media="movie"
              card={movie as SimilarMixed}
              key={movie.id}
            />
          ))) :
          (
            <div className="text-center py-6 col-span-full text-lg lg:text-xl">
              <p>No Similiar Movies Shown yet.</p>
            </div>

          )}
      </div>
      <div className="grid-cols-5 gap-2 max-w-7xl mx-auto grid"></div>
    </div>
  );
}

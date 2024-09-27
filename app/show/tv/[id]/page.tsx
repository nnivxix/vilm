"use client"

import type { TvResponse, SimilarMixed, AccountStates } from "@/types/response";
import type { Media } from "@/types/media";
import type { Provider } from "@/types/providers";
import useFetch from "@/hooks/useFetch";
import useHead from "@/hooks/useHead";
import Genres from "@/components/Genres";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import pickRandomImages from "@/utils/pick-random-images";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import RImage from "@/components/RImage";
import imageUrl from "@/utils/image-url";
import { DialogContent } from "@/components/ui/dialog";
import PopupYoutubeTrailer from "@/components/PopupYoutubeTrailer";
import WatchProviderContainer from "@/components/WatchProviderContainer";
import SimilarCardItem from "@/components/SimilarCardItem";
import getVideo from "@/utils/get-video";
import { Season } from "@/types/tv";
import SeasonCardItem from "@/components/SeasonCardItem";
import { useAccountStore } from "@/stores/account";
import AddToWatchlistButton from "@/components/AddToWatchlistButton";

interface Params {
  params: { id: string }
}

export default function page({ params }: Params) {
  const { data: tv, isLoading, error } = useFetch<TvResponse>(`/tv/${params.id}`,
    {
      append_to_response: "images,videos,watch/providers,similar",
      language: "en-US",
      include_image_language: "en,null"
    }
  );
  const { data: states } = useFetch<AccountStates>(`/tv/${params.id}/account_states`);
  const { isAuthenticated } = useAccountStore();

  useHead({
    title: 'Vilm - ' + tv?.name,
    meta: {
      description: tv?.overview as string
    }
  });


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
            <p className="col-span-full lg:col-span-full text-lg">{tv.overview}</p>
            {tv.genres.length && (
              <Genres genres={tv.genres} />
            )}
            {!!tv.images?.backdrops.length && (
              <Carousel className="lg:col-span-full col-span-full ">
                <CarouselContent>
                  {pickRandomImages(tv.images.backdrops as Media[], 7).map(
                    (image: Media, index) => (
                      <CarouselItem
                        key={index}
                        className="basis-1/2 lg:basis-1/3"
                      >
                        <Dialog>
                          <DialogTrigger>
                            <RImage
                              height={200}
                              src={imageUrl({
                                path: image.file_path,
                                size: "w300",
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
            {isAuthenticated && states ? (
              <AddToWatchlistButton states={states as AccountStates} mediaId={tv.id} type="tv" />
            ) : null}
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
            {tv.seasons.map((season: Season, index) => (
              <CarouselItem
                key={index}
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

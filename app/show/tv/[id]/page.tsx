import type { TvResponse, SimilarMixed, AccountStates } from "@/types/response";
import type { Media } from "@/types/media";
import type { Provider } from "@/types/providers";
import Genres from "@/components/Genres";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import pickRandomImages from "@/utils/pick-random-images";
import RImage from "@/components/RImage";
import imageUrl from "@/utils/image-url";
import { DialogContent, Dialog, DialogTrigger } from "@/components/ui/dialog";
import PopupYoutubeTrailer from "@/components/PopupYoutubeTrailer";
import WatchProviderContainer from "@/components/WatchProviderContainer";
import SimilarCardItem from "@/components/SimilarCardItem";
import getVideo from "@/utils/get-video";
import { Season } from "@/types/tv";
import SeasonCardItem from "@/components/SeasonCardItem";
import AddToWatchlistButton from "@/components/AddToWatchlistButton";
import config from "@/config";
import { cookies } from "next/headers";
import type { Metadata } from "next";

interface Params {
  params: { id: string }
}
interface Authentication {
  success: boolean;
  status_code: number;
  status_message: string;
}
type Status = "idle" | "pending" | "success" | "error"


const { apiUrl } = config

// eslint-disable-next-line react-refresh/only-export-components
export async function generateMetadata(
  { params }: Params
): Promise<Metadata> {
  const { tv } = await getTvShow(params.id);
  const title = `Vilm - ${tv?.name}`
  const description = tv?.overview;

  if (tv) {
    const image = imageUrl({ path: tv.backdrop_path, size: "w300" });
    return {
      title: title,
      description: description,
      openGraph: {
        title,
        description,
        images: [image]
      },
      twitter: {
        title,
        description,
        images: [image],
        card: "summary"
      }
    }
  } else {
    return {
      title: "Vilm"
    }
  }
}

export default async function Page({ params }: Params) {
  const { tv, status, error } = await getTvShow(params.id)
  const states = await getStates(params.id)
  const isAuthenticated = await authenticateUser()



  if (status === 'pending') {
    return <pre className="text-white">loading...</pre>;
  }
  if (status === 'error') {
    return <pre className="text-white">{error}</pre>;
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
                        className="basis-1/2 lg:basis-1/4"
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


async function getTvShow(movieId: string): Promise<{ tv: TvResponse | null, status: Status, error: string | null }> {
  const apiToken = cookies().get("API_TOKEN");
  let status: Status = "idle";
  let tv: TvResponse | null = null;
  let error: string | null = null;

  status = "pending";
  try {
    const response = await fetch(`${apiUrl}/tv/${movieId}?append_to_response=images,videos,watch/providers,similar&language=en-US&include_image_language=en,null`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${apiToken?.value}`,
        },
      });

    if (!response.ok) {
      throw new Error('Failed to fetch the tv data');
    }

    tv = await response.json();
    status = "success";

  } catch (err) {
    console.error(err);
    status = "error";
    error = err instanceof Error ? err.message : "Unknown error";
  }

  return { tv, status, error };
}


async function getStates(movieId: string) {
  const apiToken = cookies().get("API_TOKEN")
  try {
    const response = await fetch(`${apiUrl}/movie/${movieId}/account_states`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${apiToken?.value}`,
        }
      })

    const states = await response.json()

    return states as AccountStates;

  } catch (error) {
    console.error(error)
  }
}

async function authenticateUser(): Promise<boolean> {
  const apiToken = cookies().get("API_TOKEN")

  const response = await fetch(`${apiUrl}/authentication`, {
    method: "GET",
    headers: {
      "accept": "application/json",
      Authorization: `Bearer ${apiToken?.value}`,
    },
  })
  const isAuthenticated: Authentication = await response.json()
  return isAuthenticated.success;

}
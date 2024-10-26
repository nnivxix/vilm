import { cookies } from "next/headers";
import type { Metadata } from "next";
import type { MovieResponse, SimilarMixed, AccountStates } from "@/types/response";
import type { Media } from "@/types/media";
import type { Provider } from "@/types/providers";
import runtimeDuration from "@/utils/runtime-duration";
import getYear from "@/utils/get-year";
import Genres from "@/components/Genres";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import pickRandomImages from "@/utils/pick-random-images";
import RImage from "@/components/RImage";
import imageUrl from "@/utils/image-url";
import { DialogContent, Dialog, DialogTrigger } from "@/components/ui/dialog";
import PopupYoutubeTrailer from "@/components/PopupYoutubeTrailer";
import WatchProviderContainer from "@/components/WatchProviderContainer";
import SimilarCardItem from "@/components/SimilarCardItem";
import AddToWatchlistButton from "@/components/AddToWatchlistButton";
import getVideo from "@/utils/get-video";
import config from "@/config";


interface Params {
  params: { id: string }
}
interface Authentication {
  success: boolean;
  status_code: number;
  status_message: string;
}
type Status = "idle" | "pending" | "success" | "error"


const { apiUrl } = config;

// eslint-disable-next-line react-refresh/only-export-components
export async function generateMetadata(
  { params }: Params
): Promise<Metadata> {
  const { movie } = await getMovie(params.id);
  const title = `Vilm - ${movie?.title}`
  const description = movie?.overview;

  if (movie) {
    const image = imageUrl({ path: movie.backdrop_path, size: "w300" });
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
  const { movie, status } = await getMovie(params.id)
  const states = await getStates(params.id)
  const isAuthenticated = await authenticateUser()


  if (status === 'pending') {
    return <pre className="text-white">loading...</pre>;
  }

  if (status === 'error') {
    return <pre className="text-white">error</pre>;
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
            <p className="col-span-full lg:col-span-full text-lg">
              {movie.overview}
            </p>
            {!!movie.genres.length &&
              <Genres genres={movie.genres} />}

            {!!movie.images?.backdrops.length && (
              <Carousel className="lg:col-span-full col-span-full ">
                <CarouselContent>
                  {pickRandomImages(movie.images.backdrops as Media[], 7).map(
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
            {isAuthenticated && states ? (
              <AddToWatchlistButton states={states} mediaId={movie.id} type="movie" />
            ) : null}
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

async function getMovie(movieId: string): Promise<{ movie: MovieResponse | null, status: Status, error: string | null }> {
  const apiToken = cookies().get("API_TOKEN");
  let status: Status = "idle";
  let movie: MovieResponse | null = null;
  let error: string | null = null;

  status = "pending";
  try {
    const response = await fetch(`${apiUrl}/movie/${movieId}?append_to_response=genre,images,videos,watch/providers,similar&language=en-US&include_image_language=en,null`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${apiToken?.value}`,
        },
      });

    if (!response.ok) {
      throw new Error('Failed to fetch the movie data');
    }

    movie = await response.json();
    status = "success";

  } catch (err) {
    console.error(err);
    status = "error";
    error = err instanceof Error ? err.message : "Unknown error";
  }

  return { movie, status, error };
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
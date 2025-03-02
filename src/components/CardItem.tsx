import type { MovieTv } from "@/types/response";
import { Star } from "lucide-react";
import Link from "next/link";
import RImage from "./RImage";
import imageUrl from "../utils/image-url";
import { buttonVariants } from "./ui/button";

interface CardItemProps {
  movie: MovieTv;
  media?: string;
}
export default function CardItem({ movie, media }: CardItemProps) {
  const movieTitle = movie.title ?? movie.name;
  const getYear = () => {
    const date = movie.release_date ?? movie.first_air_date;
    return date?.split("-")[0] ?? "";
  };

  const mediaType = media ?? movie.media_type;

  return (
    <article
      title={movieTitle}
      className="group rounded-lg pb-2 relative bg-gray-900  overflow-hidden"
    >
      <div className="z-30 p-2 text-white absolute hidden group-hover:grid grid-cols-1 bg-black/50 backdrop-blur-sm w-full h-full">
        <h1 className="pb-2 text-xl font-bold">{movieTitle}</h1>
        <p className="line-clamp-6">{movie.overview}</p>
        <div className="mt-3 w-full self-end mb-4 font-bold">
          <Link
            className={`w-full ${buttonVariants({ variant: "default" })}`}
            href={`/show/${mediaType}/${movie.id}`}
          >
            View
          </Link>
        </div>
      </div>
      <div className="relative">
        <Link href={`/show/${mediaType}/${movie.id}`}>
          <RImage
            src={imageUrl({ path: movie.poster_path, type: "poster" })}
            alt={movieTitle!}
            type="poster"
            height={700}
            width={1244}
          />
        </Link>
        <div className="absolute bottom-1 left-3 ">
          <div className="flex gap-2 flex-wrap">
            {mediaType && (
              <span className="rounded-md  py-1 px-2 text-sm  bg-gray-500 capitalize text-white ">
                {mediaType}
              </span>
            )}
            {movie.adult && (
              <span className="rounded-md  py-1 px-2 text-sm  bg-red-500 capitalize text-white ">
                Mature
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-lg md:text-xl font-bold text-white px-3 py-2">
        {movieTitle}
      </p>
      <div className="flex justify-between">
        <p className="px-3 md:2xl text-white place-self-end">{getYear()}</p>
        <p className="flex px-3 gap-2 text-white">
          <Star />
          {Math.floor(movie.vote_average)}
        </p>
      </div>
    </article>
  );
}

import Link from "next/link";
import type { ComponentPropsWithRef } from "react";
import RImage from "./RImage";
import imageUrl from "@/utils/image-url";

export interface SimpleBaseMedia {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}


interface BackdropCardProps<T> extends ComponentPropsWithRef<'div'> {
  media: T;
  title: string;
}

export default function BackdropCard<T extends SimpleBaseMedia>({ media, title, ...props }: BackdropCardProps<T>) {
  const isMovieType = Object.prototype.hasOwnProperty.call(media, 'video');

  return (
    <div title={title} {...props} className={`${props.className} rounded-md group transition-transform overflow-clip  hover:scale-110`}
    >
      <Link href={`/show/${isMovieType ? 'movie' : 'tv'}/${media.id}`}>
        <RImage src={imageUrl({
          path: media.backdrop_path,
          size: 'w300',
          type: 'backdrop'

        })}
          type="backdrop"
          alt={media.overview}
        />
        <div className="lg:opacity-0 group-hover:opacity-100 line-clamp-2">
          {title}
        </div>
      </Link>
    </div>
  )
}

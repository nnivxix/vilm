import type { ComponentPropsWithRef } from "react";

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
    <div {...props} className={`${props.className} rounded-md group transition-transform overflow-clip  hover:scale-110`}>
      <RImage src={imageUrl({
        path: media.backdrop_path,
        size: 'w300',
        type: 'backdrop'
      })}
        type="backdrop"
        alt={media.overview}
      />
      <div className="block lg:hidden group-hover:block">
        <Link to={`/show/${isMovieType ? 'movie' : 'tv'}/${media.id}`}>{title}</Link>
      </div>
    </div>
  )
}

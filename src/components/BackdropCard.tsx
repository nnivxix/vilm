"use client";
import Link from "next/link";
import type { ComponentPropsWithRef } from "react";
import imageUrl from "@/utils/image-url";
import Image from "next/image";

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

interface BackdropCardProps<T> extends ComponentPropsWithRef<"div"> {
  media: T;
  title: string;
}

export default function BackdropCard<T extends SimpleBaseMedia>({
  media,
  title,
  ...props
}: BackdropCardProps<T>) {
  const isMovieType = Object.prototype.hasOwnProperty.call(media, "video");

  return (
    <div
      title={title}
      {...props}
      className={`${props.className} rounded-md group overflow-clip`}
    >
      <Link href={`/show/${isMovieType ? "movie" : "tv"}/${media.id}`}>
        <Image
          src={imageUrl({
            path: media.backdrop_path,
            size: "w300",
            type: "backdrop",
          })}
          width={300}
          height={200}
          alt={media.overview}
        />
        <div className="lg:opacity-0 group-hover:opacity-100 line-clamp-2">
          {title}
        </div>
      </Link>
    </div>
  );
}

import type { MovieResponse } from "@/types/response";
import Genres from "@/components/Genres";
import RImage from "@/components/RImage";
import imageUrl from "@/utils/image-url";
import runtimeDuration from "@/utils/runtime-duration";
import getYear from "@/utils/get-year";

interface MovieDetailModalProps {
  movie: MovieResponse;
}

export default function MovieDetailModal({ movie }: MovieDetailModalProps) {
  return (
    <div className="text-white">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Movie Poster */}
        <div className="lg:w-1/3">
          <RImage
            src={imageUrl({ path: movie.poster_path, type: "poster" })}
            alt={movie.title}
            type="poster"
            height={600}
            width={400}
            className="w-full rounded-lg"
          />
        </div>

        {/* Movie Details */}
        <div className="lg:w-2/3 space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold">{movie.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span>Duration: {runtimeDuration(movie.runtime)}</span>
            <span>{getYear(movie.release_date)}</span>
            <span>Rating: {movie.vote_average?.toFixed(1)}/10</span>
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <Genres genres={movie.genres} />
          )}

          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>

          {/* Add watchlist and other action buttons here if needed */}
        </div>
      </div>
    </div>
  );
}

import { MovieTv } from "@/types/response";

export default function Banner({ movie }: { movie: MovieTv }) {
  return (
    <div>
      {movie.backdrop_path}
      <h1>Hi</h1>
    </div>
  );
}

import type { Response, MovieTv } from "../types/response";

export default function Home() {
  useHead({
    title: 'Vilm',
    meta: {
      description: 'Best Reference Movies'
    }
  });
  const { data: movies } = useFetch<Response<MovieTv[]>>("/trending/all/day");

  return (
    <div>
      <div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-5  mx-auto px-5 mt-5">
        {movies?.results.map((movie: MovieTv) => (
          <CardItem movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

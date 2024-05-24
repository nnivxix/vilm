import type { SimpleMovie } from "@/types/movie"
import type { Response } from "@/types/response"

export default function Movies() {

  const { account, isAuthenticated } = useAccount();
  const { data: movies } = useFetch<Response<SimpleMovie[]>>(`/account/${account?.id}/watchlist/movies`)

  if (!isAuthenticated) {
    return (
      <WatchlistLayout>
        <div className="text-center">
          <p>Not Logged in</p>
          <p>Please add your token on <Link className="underline" to="/setting" >setting page.</Link></p>
        </div>
      </WatchlistLayout>
    );
  }

  return (
    <WatchlistLayout>
      <div className="grid grid-cols-6 gap-4 mt-6" >
        {movies?.results.length && (
          movies.results.map((movie, index) => (
            <BackdropCard<SimpleMovie>
              media={movie}
              title={movie.title}
              key={index}
              className="lg:col-span-1 md:col-span-2 col-span-3" />
          ))

        )

        }
      </div>
    </WatchlistLayout>
  )
}

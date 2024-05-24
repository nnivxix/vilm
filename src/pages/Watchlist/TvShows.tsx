import type { SimpleTv } from "@/types/tv"
import type { Response } from "@/types/response"

export default function TvShows() {
  const { account, isAuthenticated } = useAccount()
  const { data: tv } = useFetch<Response<SimpleTv[]>>(`/account/${account?.id}/watchlist/tv`)

  if (!isAuthenticated) {
    return (
      <WatchlistLayout>
        <div className="text-center">
          <p>Not Logged in</p>
          <p>Please add your token on <Link className="underline" to="/setting" >setting page.</Link></p>
        </div>
      </WatchlistLayout>)
  }

  return (
    <WatchlistLayout>
      <div className="grid grid-cols-6 gap-4 mt-6" >
        {tv?.results.length && (
          tv.results.map((tv, index) => (
            <BackdropCard<SimpleTv>
              media={tv}
              title={tv.name}
              key={index}
              className="lg:col-span-1 md:col-span-2 col-span-3" />
          ))

        )

        }
      </div>
    </WatchlistLayout>
  )
}

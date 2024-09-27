"use client"

import BackdropCard from "@/components/BackdropCard";
import useFetch from "@/hooks/useFetch";
import useHead from "@/hooks/useHead";
import type { SimpleMovie } from "@/types/movie"
import type { Response } from "@/types/response"

export default function Movies() {

  // const { account, isAuthenticated } = useAccount();
  const { data: movies } = useFetch<Response<SimpleMovie[]>>(`/account/9578292/watchlist/movies`)

  useHead({
    title: 'Vilm - Movies Watchlist',
    meta: {
      description: 'Here you can manage watchlist movies.'
    }
  });

  // if (!isAuthenticated) {
  //   return (
  //     <WatchlistLayout>
  //       <div className="text-center">
  //         <p>Not Logged in</p>
  //         <p>Please add your token on <Link className="underline" to="/setting" >setting page.</Link></p>
  //       </div>
  //     </WatchlistLayout>
  //   );
  // }

  return (
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
  )
}

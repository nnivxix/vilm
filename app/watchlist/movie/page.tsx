"use client"

import BackdropCard from "@/components/BackdropCard";
import useFetch from "@/hooks/useFetch";
import useHead from "@/hooks/useHead";
import { useAccountStore } from "@/stores/account";
import type { SimpleMovie } from "@/types/movie"
import type { Response } from "@/types/response"
import Link from "next/link";

export default function Page() {

  const { isAuthenticated } = useAccountStore();
  const { data: movies } = useFetch<Response<SimpleMovie[]>>(`/account/9578292/watchlist/movies`)

  useHead({
    title: 'Vilm - Movies Watchlist',
    meta: {
      description: 'Here you can manage watchlist movies.'
    }
  });

  if (!isAuthenticated) {
    return (
      <div className="text-center">
        <p>Not Logged in</p>
        <p>Please add your token on <Link className="underline" href="/setting" >setting page.</Link></p>
      </div>

    );
  }

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

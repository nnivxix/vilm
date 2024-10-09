"use client"

import BackdropCard from "@/components/BackdropCard";
import Pagination from "@/components/Pagination";
import useFetch from "@/hooks/useFetch";
import useHead from "@/hooks/useHead";
import { useAccountStore } from "@/stores/account";
import type { SimpleMovie } from "@/types/movie"
import type { Response } from "@/types/response"
import paginationPages from "@/utils/pagination-pages";
import Link from "next/link";

export default function Page() {
  const { isAuthenticated } = useAccountStore();
  const { data: movies } = useFetch<Response<SimpleMovie[]>>(`/account/9578292/watchlist/movies`);

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
  // Todo: fix this to actual data
  const pages = paginationPages(5, 19)

  return (
    <div>

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
      <div className="flex w-full">


        {pages.length && (
          <Pagination pages={pages} />

        )}
      </div>
    </div>
  )
}

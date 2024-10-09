"use client"

import BackdropCard from "@/components/BackdropCard";
import Pagination from "@/components/Pagination";
import useFetch from "@/hooks/useFetch";
import useHead from "@/hooks/useHead";
import { useAccountStore } from "@/stores/account";
import type { SimpleMovie } from "@/types/movie"
import type { Response } from "@/types/response"
import paginationPages from "@/utils/pagination-pages";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const searchParams = useSearchParams()

  const currentPage = searchParams.get('page') ?? '1'

  const { isAuthenticated, account } = useAccountStore();
  const { data: movies } = useFetch<Response<SimpleMovie[]>>(`/account/${account?.id}/watchlist/movies?page=${currentPage}&sort_by=created_at.desc`);

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
  const pages = paginationPages(Number(currentPage), movies?.total_pages as number)

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

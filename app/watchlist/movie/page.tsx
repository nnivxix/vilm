import type { SimpleMovie } from "@/types/movie"
import type { Response } from "@/types/response"
import type { Metadata } from "next";
import type { Account } from "@/contexts/AccountContext/AccountProvider";
import Link from "next/link";
import { Suspense } from "react";
import { cookies } from 'next/headers'
import BackdropCard from "@/components/BackdropCard";
import Pagination from "@/components/Pagination";
import paginationPages from "@/utils/pagination-pages";
import config from "@/config";

interface Authentication {
  success: boolean;
  status_code: number;
  status_message: string;
}

const { apiUrl } = config;

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Vilm - Movies Watchlist ",
  description: 'Here you can manage watchlist movies.',
}

export default async function Page({ searchParams }:
  {
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
  const currentPage = searchParams.page ?? "1";

  const isAuthenticated = await authenticateUser();
  const account = await getAccount();
  const movies = await getWatchlistMovies(account.id, currentPage as string);

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
      <Suspense>
        <div className="flex w-full">
          {pages.length && (
            <Pagination pages={pages} />
          )}
        </div>
      </Suspense>
    </div>
  )
}

async function getAccount() {
  const apiToken = cookies().get("API_TOKEN")

  const response = await fetch(`${apiUrl}/account`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken?.value}`,
    },
  });

  const data: Account = await response.json();

  return data
}


async function getWatchlistMovies(accountId: number, currentPage: string) {
  const apiToken = cookies().get("API_TOKEN")

  const response = await fetch(`${apiUrl}/account/${accountId}/watchlist/movies?page=${currentPage}&sort_by=created_at.desc`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: `Bearer ${apiToken?.value}`,
    },
  })
  const movies: Response<SimpleMovie[]> = await response.json();

  return movies
}

async function authenticateUser(): Promise<boolean> {
  const apiToken = cookies().get("API_TOKEN")

  const response = await fetch(`${apiUrl}/authentication`, {
    method: "GET",
    headers: {
      "accept": "application/json",
      Authorization: `Bearer ${apiToken?.value}`,
    },
  })

  const isAuthenticated: Authentication = await response.json()
  return isAuthenticated.success;

}
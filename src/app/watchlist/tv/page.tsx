import type { SimpleTv } from "@/types/tv";
import type { Response } from "@/types/response";
import type { Metadata } from "next";
import type { Account } from "@/contexts/AccountContext/AccountProvider";
import Link from "next/link";
import { Suspense } from "react";
import { cookies } from "next/headers";
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

export const metadata: Metadata = {
  title: "Vilm - Tv Shows Watchlist ",
  description: "Here you can manage watchlist tv shows.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = searchParams.page ?? "1";

  const isAuthenticated = await authenticateUser();
  const account = await getAccount();
  const tv = await getWatchlistTv(account.id, currentPage as string);

  if (!isAuthenticated) {
    return (
      <div className="text-center">
        <p>Not Logged in</p>
        <p>
          Please add your token on{" "}
          <Link className="underline" href="/setting">
            setting page.
          </Link>
        </p>
      </div>
    );
  }

  const pages = paginationPages(Number(currentPage), tv?.total_pages as number);

  return (
    <div>
      <div className="grid grid-cols-6 gap-4 mt-6">
        {tv?.results.length &&
          tv.results.map((tv, index) => (
            <BackdropCard<SimpleTv>
              media={tv}
              title={tv.name}
              key={index}
              className="lg:col-span-1 md:col-span-2 col-span-3"
            />
          ))}
      </div>
      <Suspense>
        <div className="flex w-full">
          {pages.length && <Pagination pages={pages} />}
        </div>
      </Suspense>
    </div>
  );
}

async function getWatchlistTv(accountId: number, currentPage: string) {
  const apiToken = cookies().get("API_TOKEN");

  const response = await fetch(
    `${apiUrl}/account/${accountId}/watchlist/tv?page=${currentPage}&sort_by=created_at.desc`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiToken?.value}`,
      },
    }
  );
  const movies: Response<SimpleTv[]> = await response.json();

  return movies;
}

async function getAccount() {
  const apiToken = cookies().get("API_TOKEN");

  const response = await fetch(`${apiUrl}/account`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken?.value}`,
    },
  });

  const data: Account = await response.json();

  return data;
}

async function authenticateUser(): Promise<boolean> {
  const apiToken = cookies().get("API_TOKEN");

  const response = await fetch(`${apiUrl}/authentication`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken?.value}`,
    },
  });
  if (response.status === 200) {
    return true;
  }
  return false;
}

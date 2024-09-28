"use client"
import type { SimpleTv } from "@/types/tv"
import type { Response } from "@/types/response"
import useFetch from "@/hooks/useFetch";
import useHead from "@/hooks/useHead";
import BackdropCard from "@/components/BackdropCard";
import { useAccountStore } from "@/stores/account";
import Link from "next/link";

export default function Page() {
  const { isAuthenticated } = useAccountStore()
  const { data: tv } = useFetch<Response<SimpleTv[]>>(`/account/9578292/watchlist/tv`)


  useHead({
    title: 'Vilm - Tv Shows Watchlist',
    meta: {
      description: 'Here you can manage watchlist tv shows.'
    }
  });

  if (!isAuthenticated) {
    return (
      <div className="text-center">
        <p>Not Logged in</p>
        <p>Please add your token on <Link className="underline" href="/setting" >setting page.</Link></p>
      </div>
    )
  }

  return (
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
  )
}

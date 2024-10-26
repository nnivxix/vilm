"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Link from 'next/link'

export default function Pagination({ pages }: { pages: (number | string)[] }) {
  const pathname = usePathname();
  const currentPage = useSearchParams().get("page") ?? "1";

  return (
    <div className="flex justify-center w-full py-6">
      <div className="flex gap-4" >
        {pages.length && pages.map((page, index) => (
          typeof page === "number" ? (
            <Link
              key={index}
              className={currentPage === page.toString() ? "px-3 py-2 bg-backgroud text-foreground border border-foreground" : "px-3 py-2 bg-foreground text-background"}
              href={`${pathname}?page=${page}`} // Assuming you need to link to a dynamic page
            >
              {page}
            </Link>
          ) : (
            <button
              key={index}
              className="px-3 py-2 bg-foreground text-background"
            >
              {page}
            </button>
          ))
        )}
      </div>
    </div>
  )
}

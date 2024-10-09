"use client"

import Link from "next/link"

export default function Pagination({ pages }: { pages: (number | string)[] }) {
  return (
    <div className="flex justify-center w-full">
      <div className="flex  gap-4" >
        {pages.length && pages.map((page, index) => (
          typeof page === "number" ? (
            <Link
              key={index}
              className="px-3 py-2 bg-foreground text-background"
              href={`/${page}`} // Assuming you need to link to a dynamic page
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

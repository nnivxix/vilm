"use client";
import React from "react";
// import "../src/index.css";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActivePath = (path: string) => {
    return pathname?.includes(path);
  };
  const paths = [
    {
      location: "/watchlist/movie",
      label: "Movies",
    },
    {
      location: "/watchlist/tv",
      label: "Tv Shows",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Watchlist</h1>
        <div className="flex gap-3">
          {paths.map((path, index) => {
            return (
              <Button
                key={index}
                variant={isActivePath(path.location) ? "default" : "secondary"}
                asChild
              >
                <Link href={path.location}>{path.label}</Link>
              </Button>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
}

"use client"

import { LibraryBig, Settings } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import gravatarUrl from "@/utils/gravatar-url";

export default function Navbar() {


  return (
    <div className="bg-gray-900">
      <nav className="flex max-w-6xl mx-auto h-16 items-center  justify-between px-3  bg-gray-900 text-white">
        <Link href="/" className="logo">
          <h1 className="text-2xl md:text-4xl italic font-bold">Vilm</h1>
        </Link>
        <div className="flex gap-3 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={gravatarUrl("guest")}
                />
                <AvatarFallback>
                  {"G"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                Hello {"Guest"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-normal" asChild>
                <Link href="/setting" title="Go to profile setting page">
                  <Settings />
                  <span className="ml-3">Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-normal" asChild>
                <Link href="/watchlist/movie" title="Go to watchlist page">
                  <LibraryBig />
                  <span className="ml-3">My Watchlist</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}

"use client";

import { getCookie } from "cookies-next";
import { LibraryBig, Settings } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import gravatarUrl from "@/utils/gravatar-url";
import { type Account, useAccountStore } from "@/stores/account";
import config from "@/config";
import { useEffect } from "react";

const { apiUrl } = config;

export default function Navbar() {
  const token = getCookie("API_TOKEN");
  const { account, setAccount, setIsAuthenticated } = useAccountStore();

  useEffect(() => {
    const getAccount = async () => {
      if (!token?.length) return;

      const response = await fetch(`${apiUrl}/account`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data: Account = await response.json();

      if (!data.id) {
        setIsAuthenticated(false);
        setAccount(null);
      } else {
        setAccount(data);
        setIsAuthenticated(true);
      }
    };
    getAccount();
  }, [setAccount, setIsAuthenticated, token]);

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
                  src={gravatarUrl(account?.avatar?.gravatar.hash ?? "guest")}
                />
                <AvatarFallback>
                  {account?.username.at(0) ?? "G"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                Hello {account?.username ?? "Guest"}
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

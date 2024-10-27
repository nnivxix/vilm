"use client";
import { useAccountStore } from "@/stores/account";
import type { AccountStates } from "@/types/response";
import { ResponseMessage } from "@/utils/$fetch";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Button } from "./ui/button";
import $fetch from "@/utils/$fetch";

interface Props {
  states: AccountStates;
  type: "movie" | "tv";
  mediaId: number | string;
}

export default function AddToWatchlistButton({ states, type, mediaId }: Props) {
  const { account } = useAccountStore();
  const { toast } = useToast();
  const [isWatchlisted, setIsWatchlisted] = useState(states.watchlist);
  const addToWatchlist = async () => {
    try {
      const { data } = await $fetch<ResponseMessage>(
        `/account/${account?.id}/watchlist`,
        {
          method: "POST",
          body: {
            media_type: type,
            media_id: mediaId,
            watchlist: isWatchlisted === true ? false : true,
          },
        }
      );
      setIsWatchlisted(!isWatchlisted);

      toast({
        title: data.status_message,
        description: "Please check your watchlist.",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      className="lg:col-span-1 col-span-full"
      onClick={addToWatchlist}
      variant={isWatchlisted ? "secondary" : "default"}
    >
      {isWatchlisted === true ? "Remove from" : "Add to"} Watchlist
    </Button>
  );
}

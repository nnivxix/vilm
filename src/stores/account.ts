import $fetch from "@/utils/$fetch";
import $localStorage from "@/utils/$local-storage";
import { create } from "zustand";

export interface Account {
  avatar: Avatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface Avatar {
  gravatar: Gravatar;
  tmdb: Tmdb;
}

export interface Gravatar {
  hash: string;
}

export interface Tmdb {
  avatar_path?: string;
}

type AccountState = {
  account: Account | null;
  isAuthenticated: boolean;
  setAccount: (account: Account | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  fetchAccount: () => Promise<void>;
};

// Zustand store with TypeScript
export const useAccountStore = create<AccountState>((set) => ({
  account: null,
  isAuthenticated: false,

  setAccount: (account: Account | null) =>
    set(() => ({
      account,
      isAuthenticated: !!account?.username,
    })),

  setIsAuthenticated: (isAuthenticated: boolean) =>
    set(() => ({
      isAuthenticated,
    })),

  fetchAccount: async () => {
    const { item: token } = $localStorage("token");
    if (!token?.length) return;

    const { data, error } = await $fetch<Account>("/account", {
      headers: {
        Authorization: "Bearer " + token,
      },
      defaultToken: false,
    });

    if (error?.success === false) {
      set(() => ({
        isAuthenticated: false,
      }));
    } else {
      set(() => ({
        account: data,
        isAuthenticated: true,
      }));
    }
  },
}));

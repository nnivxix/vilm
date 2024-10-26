"use client";
import { useContext } from "react";
import { AccountProviderContext } from "./AccountProvider";
export const useAccount = () => {
  const context = useContext(AccountProviderContext);

  return context;
};

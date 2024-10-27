"use client";
import type { ProvidersResponse } from "@/types/providers";
import WatchProvider from "./WatchProvider";
import getProviders from "@/utils/get-providers";

interface WatchProviderContainerProps {
  providers: ProvidersResponse["results"];
}

export default function WatchProviderContainer({
  providers,
}: WatchProviderContainerProps) {
  return (
    <div>
      {!!getProviders(providers).buy?.length && (
        <WatchProvider providers={getProviders(providers).buy!} type="Buy" />
      )}
      {!!getProviders(providers).rent?.length && (
        <WatchProvider providers={getProviders(providers).rent!} type="Rent" />
      )}
      {!!getProviders(providers).ads?.length && (
        <WatchProvider providers={getProviders(providers).ads!} type="Ads" />
      )}
      {!!getProviders(providers).flatrate?.length && (
        <WatchProvider
          providers={getProviders(providers).flatrate!}
          type="Stream"
        />
      )}
    </div>
  );
}

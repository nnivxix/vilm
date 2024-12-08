interface ImageUrl {
  path: string;
  size?: "original" | "w500" | "w300";
  type?: "backdrop" | "poster" | "logo";
}

function imageUrl({ path, size = "w300", type = "poster" }: ImageUrl): string {
  const typePaths = [
    {
      type: "poster",
      pathImage: "/poster-fallback.png",
    },
    {
      type: "backdrop",
      pathImage: "/backdrop-fallback.png",
    },
  ];
  for (const typePath of typePaths) {
    if (!path && typePath.type === type) {
      return typePath.pathImage;
    }
  }
  // const isSSR = typeof window === "undefined";

  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export default imageUrl;

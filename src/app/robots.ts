import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "facebookexternalhit",
      crawlDelay: 86400,
    },
  };
}

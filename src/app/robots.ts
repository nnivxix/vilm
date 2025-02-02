import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: ["facebookexternalhit", "meta-externalagent"],
      crawlDelay: 86400,
      disallow: ["/"],
    },
  };
}

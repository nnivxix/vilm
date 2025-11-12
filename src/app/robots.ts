import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: [
        "facebookexternalhit",
        "meta-externalagent",
        "GPTBot",
        "SemrushBot",
        "BacklinksExtendedBot",
        "Amazonbot",
      ],
      crawlDelay: 86400,
      disallow: ["/"],
    },
  };
}

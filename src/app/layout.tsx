import React from "react";
import "@/index.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";

export const metadata: Metadata = {
  title: "Vilm",
  description: "Get movies and tv shows information.",
  openGraph: {
    siteName: "Vilm",
    type: "website",
    url: "https://vilm-react.vercel.app/",
    title: "Vilm",
    description: "Get movies and tv shows information.",
    images: [
      {
        url: "/og-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@nnivxix",
    title: "Get movies and tv shows information.",
    description: "Get movies and tv shows information.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="UTF-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href="/poster-fallback.png"
          type="image/png"
        />
        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href="/backdrop-fallback.png"
          type="image/png"
        />
      </head>
      <body>
        <Navbar />
        <CookiesProvider>{children}</CookiesProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

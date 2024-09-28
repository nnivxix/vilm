import React from "react";
import "../src/index.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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

        <title>Vilm</title>
        <meta name="description" content="Get movies and tv shows information." />
        <meta property="og:site_name" content="Vilm" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vilm-react.vercel.app/" />
        <meta property="og:title" content="Vilm" />
        <meta
          property="og:description"
          content="Get movies and tv shows information."
        />
        <meta property="og:image" content="/og-image.jpg" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://vilm-react.vercel.app/" />
        <meta
          property="twitter:title"
          content="Get movies and tv shows information."
        />
        <meta
          property="twitter:description"
          content="Get movies and tv shows information."
        />
        <meta property="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:creator" content="@nnivxix" />
      </head>
      <body>
        <Navbar />
        <div id="root">{children}</div>
        <Footer />
        <Toaster />
        {/* <script type="module" src="/src/main.tsx"></script> */}
      </body>
    </html>
  );
}
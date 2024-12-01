// import { cookies } from 'next/headers'
// import { get } from 'next-client-cookies';

import { getCookie } from "cookies-next";

// const tokenStorage =
//   typeof window !== "undefined" && window.localStorage
//     ? localStorage.getItem("token")
//     : "";

const apiToken = getCookie("API_TOKEN");

const config = {
  apiUrl: "https://api.themoviedb.org/3",
  token: apiToken || process.env.NEXT_PUBLIC_TMDB_API_TOKEN,
  appUrl: process.env.NEXT_PUBLIC_APP_BASE_URL || "http://localhost:3000",
};

export default config;

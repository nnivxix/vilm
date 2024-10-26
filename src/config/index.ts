// import { cookies } from 'next/headers'
// import { get } from 'next-client-cookies';

const tokenStorage =
  typeof window !== "undefined" && window.localStorage
    ? localStorage.getItem("token")
    : "";

// const apiToken = useCookies().get("API_TOKEN")

const config = {
  apiUrl: "https://api.themoviedb.org/3",
  token: tokenStorage || process.env.NEXT_PUBLIC_TMDB_API_TOKEN,
};

export default config;

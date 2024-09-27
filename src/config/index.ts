"use client";

const tokenStorage =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDJhNzUyZDY1NGY3NGY4NDZjMDZkYzQwM2IxZGVlNiIsIm5iZiI6MTcyNzMzMjI5OC45NjE5MDMsInN1YiI6IjVmM2E0M2JhYmU0YjM2MDAzM2FmY2M3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BhnGy91e8WhCIXWZ6uoneg0urdXyFbg1oWZZPeSWngE";

const config = {
  apiUrl: "https://api.themoviedb.org/3",
  token: tokenStorage ?? import.meta.env.VITE_TMDB_API_TOKEN,
};

export default config;

const tokenStorage = localStorage.getItem("token");

const config = {
  apiUrl: "https://api.themoviedb.org/3",
  token: tokenStorage ?? import.meta.env.VITE_TMDB_API_TOKEN,
};

export default config;

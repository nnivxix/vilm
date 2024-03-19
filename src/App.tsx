import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Response, Movie } from "./types/response";

function App() {
	const [movies, setMovies] = useState<Movie[]>();
	const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

	useEffect(() => {
		const fetchMovies = async () => {
			const response = await fetch(
				"https://api.themoviedb.org/3/trending/all/day",
				{
					headers: {
						Authorization: "Bearer " + API_TOKEN,
					},
				}
			);
			const data: Response = await response.json();
			console.log(data);
			setMovies(data.results);
		};

		fetchMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Navbar />

			{movies?.map((movie: Movie) => (
				<h1 key={movie.id}>{movie.title}</h1>
			))}
		</>
	);
}

export default App;

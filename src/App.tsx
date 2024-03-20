import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tv from "./pages/Show/Tv";
import Movie from "./pages/Show/Movie";
import Search from "./pages/Search";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/show/tv/:id" element={<Tv />} />
				<Route path="/show/movie/:id" element={<Movie />} />
				<Route path="/search" element={<Search />} />
			</Routes>
		</Router>
	);
}

export default App;

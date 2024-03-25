import "./App.css";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vilm-theme">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/show/tv/:id" element={<Tv />} />
					<Route path="/show/movie/:id" element={<Movie />} />
					<Route path="/search" element={<Search />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;

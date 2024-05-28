import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vilm-theme">
      <AccountProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/tv/:id" element={<Tv />} />
            <Route path="/show/movie/:id" element={<Movie />} />
            <Route path="/search" element={<Search />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/watchlist/movie" element={<Movies />} />
            <Route path="/watchlist/tv" element={<TvShows />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Footer />
        </Router>
      </AccountProvider>
    </ThemeProvider>
  );
}

export default App;

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 border-t-4 border-blue-600 w-full mt-9">
      <div className="w-full px-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="col-spans-1">
          <h1 className="text-2xl font-bold mb-4">Vilm</h1>
          <p className="text-gray-400 mb-1 ">
            The Vilm website is a movie discovery platform featuring a modern
            design. Users can browse various movie titles and access detailed
            information, including the synopsis and trailers.
          </p>
          <div className="flex items-center mb-4">
            <h3 className="text-gray-400">Data provided by </h3>
            <Link to="https://www.themoviedb.org" target="_blank">
              <img src="tmdb.png" alt="" width={"80px"} className="ml-2" />
            </Link>
          </div>
          <p className="text-gray-400">© 2024</p>
        </div>
      </div>
    </footer>
  );
}

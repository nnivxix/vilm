import { Link } from "react-router-dom";
export default function Navbar() {
	return (
		<div className="bg-gray-900">
			<nav className="flex max-w-6xl mx-auto h-16 items-center  justify-between px-3  bg-gray-900 text-white">
				<Link to="/" className="logo">
					<h1 className="text-2xl md:text-4xl font-bold">Vilm</h1>
				</Link>
				<div className="flex">
					<input
						type="search"
						className="rounded-md p-2 md:w-96 focus:outline-none focus:ring-2  focus:ring-gray-700 focus:border-transparent"
						v-model="query"
						aria-label="Search"
						placeholder="Search movies and tv shows"
						style={{ backgroundColor: "#c4c4c430" }}
					/>
				</div>
			</nav>
		</div>
	);
}

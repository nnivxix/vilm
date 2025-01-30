import Link from "next/link";
import Image from "next/image";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white  border-t-4 border-blue-600  mt-9">
      <div className=" max-w-6xl mx-auto px-4 py-6 gap-4 grid grid-cols-1 lg:grid-cols-2 ">
        <div className="col-spans-1 flex flex-col gap-2">
          <h1 className="text-2xl font-bold mb-4 italic">Vilm</h1>
          <p className="text-gray-400 mb-1 ">
            The Vilm website is a movie discovery platform featuring a modern
            design. Users can browse various movie titles and access detailed
            information, including the synopsis and trailers.
          </p>
          <div className="flex items-center  gap-3">
            <h3 className="text-gray-400">Data provided by </h3>
            <Link href="https://www.themoviedb.org" target="_blank">
              <Image src="/tmdb.png" alt="Tmbdb Logo" width={80} height={10} />
            </Link>
          </div>
          <ul className="flex gap-3">
            <li className="hover:underline transition-all duration-150">
              <Link href={"https://github.com/nnivxix/vilm"} target="_blank">
                <GitHubLogoIcon className="w-8 h-8 opacity-70 hover:opacity-100 transition-opacity ease-in duration-300" />
              </Link>
            </li>
          </ul>
          <p className="text-gray-400">© 2024</p>
        </div>
      </div>
    </footer>
  );
}

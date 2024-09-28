import type { FormEvent } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils"

export default function Home() {
  useHead({
    title: 'Vilm',
    meta: {
      description: 'Best Reference Movies'
    }
  });
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("title");
  const [search, setSearch] = useState<string>(querySearch ?? "");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!search.length) {
      return;
    }
    navigate({
      pathname: "/search",
      search: `?title=${search}&type=movie`,
    });
  };

  return (
    <div className="lg:bg-[url('/home-banner.jpg')] bg-[url('/home-banner-vertical.jpg')] bg-center bg-cover" data-bg-src="https://www.pexels.com/photo/three-friends-watching-at-a-movie-theater-while-eating-popcorn-8263318/">
      <div className="mx-auto max-w-4xl  px-5 mt-5">
        <div className="flex w-full lg:h-[63vh] h-[45vh] md:h-[56vh] justify-center flex-col gap-3 items-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold italic">Vilm</h1>
            <h2 className="text-xl font-bold">Explore what you next watch?</h2>
          </div>
          <form onSubmit={handleSearch} className="lg:w-1/2 w-full">
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-md py-5 w-full focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
              aria-label="Search"
              placeholder="Search movies and tvs"
              style={{ backgroundColor: "#c4c4c430" }}
            />
          </form>
          <p>
            Or
          </p>
          <Link to={'/discover'} className={`lg:w-1/2 w-full ${cn(buttonVariants({ variant: "default" }))}`}> Discover </Link>
        </div>
      </div>
    </div>
  );
}

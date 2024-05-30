import { LibraryBig, Settings } from "lucide-react";
import type { FormEvent } from "react";

export default function Navbar() {
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("title");
  const [search, setSearch] = useState<string>(querySearch ?? "");
  const navigate = useNavigate();
  const { account } = useAccount();

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
    <div className="bg-gray-900">
      <nav className="flex max-w-6xl mx-auto h-16 items-center  justify-between px-3  bg-gray-900 text-white">
        <Link to="/" className="logo">
          <h1 className="text-2xl md:text-4xl font-bold">Vilm</h1>
        </Link>
        <div className="flex gap-3 items-center">
          <form onSubmit={handleSearch}>
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-md p-2 md:w-96 focus:outline-none focus:ring-2  focus:ring-gray-700 focus:border-transparent"
              aria-label="Search"
              placeholder="Search movies and tvs"
              style={{ backgroundColor: "#c4c4c430" }}
            />
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={gravatarUrl(account?.avatar?.gravatar.hash ?? "guest")}
                />
                <AvatarFallback>
                  {account?.username ? account?.username[0] : "G"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                Hello {account?.username ?? "Guest"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-normal" asChild>
                <Link to="/setting" title="Go to profile setting page">
                  <Settings />
                  <span className="ml-3">Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-normal" asChild>
                <Link to="/watchlist/movie" title="Go to watchlist page">
                  <LibraryBig />
                  <span className="ml-3">My Watchlist</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}

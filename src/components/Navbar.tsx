import { LibraryBig, Settings } from "lucide-react";

export default function Navbar() {
  const { account } = useAccount();

  return (
    <div className="bg-gray-900">
      <nav className="flex max-w-6xl mx-auto h-16 items-center  justify-between px-3  bg-gray-900 text-white">
        <Link to="/" className="logo">
          <h1 className="text-2xl md:text-4xl italic font-bold">Vilm</h1>
        </Link>
        <div className="flex gap-3 items-center">
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

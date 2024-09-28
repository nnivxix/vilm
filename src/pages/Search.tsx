import type { MovieTv, Response } from "@/types/response";
import type { FormEvent } from "react";

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryTitle = searchParams.get("title");
  const queryType = searchParams.get("type");

  const [results, setResults] = useState<MovieTv[]>([]);
  const [title, setTitle] = useState<string>(queryTitle ?? "");
  const [type, setType] = useState<string>(queryType ?? "movie");

  const { data } = useFetch<Response<MovieTv[]>>(
    `/search/${queryType}?query=${queryTitle}`
  );

  const changeType = (value: string) => {
    setType(value);
    navigate({
      pathname: "/search",
      search: `?title=${title}&type=${value}`,
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    navigate({
      pathname: "/search",
      search: `?title=${title}&type=${type}`,
    });
  };

  useHead({
    title: `Vilm - Search ${type} "${title}"`,
    meta: {
      description: 'Here you can search movies or tv shows'
    }
  });
  useEffect(() => {
    if (!queryTitle && !queryType) {
      navigate("/");
    }

    setType(queryType!);
    setTitle(queryTitle!);
    setResults(data?.results as MovieTv[]);
  }, [data, navigate, queryTitle, queryType, results]);
  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="grid md:grid-cols-4 grid-cols-1 px-4 max-w-4xl mx-auto gap-2 mt-5 text-white mb-20 md:mb-16"
      >
        <Input
          type="text"
          value={title}
          className="bg-slate-800 text-white md:col-span-3 col-span-1"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select value={type} onValueChange={(value) => changeType(value)}>
          <SelectTrigger className="w-[180px] col-span-1 bg-slate-800">
            <SelectValue placeholder="Select Media Type " />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 text-white">
            <SelectGroup>
              <SelectItem className=" hover:bg-slate-600" value="movie">
                Movie
              </SelectItem>
              <SelectItem className=" hover:bg-slate-600" value="tv">
                Tv
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </form>
      <div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-5  mx-auto px-5 mt-5">
        {!!results?.length &&
          results?.map((movie: MovieTv) => (
            <CardItem media={queryType!} movie={movie} key={movie.id} />
          ))}
        <div className="col-span-full py-3 mx-auto">
          <p>
            didn't found what you search?{" "}
            <button
              className="underline"
              onClick={() => changeType(type === "movie" ? "tv" : "movie")}
            >
              please change type
            </button>
          </p>
        </div>
        {/* Fallback if results is null */}
      </div>
    </div>
  );
}

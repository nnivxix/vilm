import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import type { MovieTv, Response } from "@/types/response";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CardItem from "@/components/CardItem";

export default function Search() {
	const [searchParams] = useSearchParams();

	const queryTitle = searchParams.get("title");
	const queryType = searchParams.get("type");

	const [results, setResults] = useState<MovieTv[]>([]);
	const [title, setTitle] = useState<string>(queryTitle ?? "");
	const [type, setType] = useState<string>("movie");
	const { data } = useFetch<Response<MovieTv[]>>(
		`/search/${queryType}?query=${queryTitle}`
	);

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();

		// TODO: Handle search
		console.log({ type, title });
	};

	useEffect(() => {
		setResults(data?.results as MovieTv[]);
	}, [data, results]);
	return (
		<div>
			<form
				onSubmit={handleSearch}
				className="grid md:grid-cols-4 grid-cols-1 px-4 max-w-4xl mx-auto gap-2 text-white"
			>
				<Input
					type="text"
					value={title}
					className="bg-slate-800 text-white md:col-span-3 col-span-1"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<Select value={type} onValueChange={(value) => setType(value)}>
					<SelectTrigger className="w-[180px] bg-dark col-span-1">
						<SelectValue placeholder="Select Media Type " />
					</SelectTrigger>
					<SelectContent className="bg-dark text-white">
						<SelectGroup>
							<SelectItem value="movie">Movie</SelectItem>
							<SelectItem value="tv">Tv</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</form>
			<div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-5  mx-auto px-5 mt-5">
				{!!results?.length &&
					results?.map((movie: MovieTv) => (
						<CardItem media={queryType!} movie={movie} key={movie.id} />
					))}
			</div>
		</div>
	);
}

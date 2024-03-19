import { useState, useEffect } from "react";
import config from "@/config";

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

const useFetch = (path: string) => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsPending(true);
			try {
				const response = await fetch(`${config.apiUrl}${path}`, {
					headers: {
						Authorization: "Bearer " + API_TOKEN,
					},
				});
				if (!response.ok) throw new Error(response.statusText);
				const json = await response.json();
				setIsPending(false);
				setData(json);
				setError(null);
			} catch (error) {
				setError(`${error} Could not Fetch Data `);
				setIsPending(false);
			}
		};
		fetchData();
	}, [path]);
	return { data, isPending, error };
};

export default useFetch;

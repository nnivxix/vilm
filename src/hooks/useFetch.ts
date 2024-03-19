/**
 *
 * WIP
 *
 */

import config from "@/config";
import { useEffect, useState } from "react";

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

async function useFetch<T>(path: string) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<T>();

	useEffect(() => {
		async function fectData() {
			const response = await fetch(config.apiUrl + path, {
				headers: {
					Authorization: "Bearer " + API_TOKEN,
				},
			});
			const json = await response.json();

			if (json) {
				setData(json);
				setLoading(true);
			}
		}

		fectData();
	}, [path]);

	return [data, loading];
}

export default useFetch;

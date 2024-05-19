import config from "@/config";

const API_TOKEN = config.token;

function useFetch<DataT>(path: string) {
	const [data, setData] = useState<DataT>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`${config.apiUrl}${path}`, {
					headers: {
						Accept: "application/json",
						Authorization: "Bearer " + API_TOKEN,
					},
				});

				if (!response.ok) throw new Error(response.statusText);
				const json = await response.json();

				setIsLoading(false);
				setData(json);
				setError(null);
			} catch (error) {
				setError(`${error} Could not Fetch Data `);
				setIsLoading(false);
			}
		};
		fetchData();
	}, [path]);
	return { data, isLoading, error };
}

export default useFetch;

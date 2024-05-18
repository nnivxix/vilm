export interface Account {
	avatar: Avatar;
	id: number;
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	include_adult: boolean;
	username: string;
}

export interface Avatar {
	gravatar: Gravatar;
	tmdb: Tmdb;
}

export interface Gravatar {
	hash: string;
}

export interface Tmdb {
	avatar_path?: string;
}

const useAccount = () => {
	const { item: token } = $localStorage("token");
	const [account, setAccount] = useState<Account | null>(null);

	useEffect(() => {
		const getAccount = async () => {
			const response = await $fetch<Response>("/account", {
				headers: {
					Authorization: "Bearer " + token,
				},
				defaultToken: false,
			});

			const data = await response.json();

			setAccount(data);
		};

		getAccount();
	}, [token]);

	return { account, setAccount };
};

export default useAccount;

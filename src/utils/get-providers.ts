interface Provider {
	logo_path: string;
	provider_id: number;
	provider_name: string;
	display_priority: number;
}

interface Providers {
	buy?: Provider[];
	rent?: Provider[];
	ads?: Provider[];
	flatrate?: Provider[];
}

interface CountryData {
	link: string;
	rent?: Provider[];
	buy?: Provider[];
	ads?: Provider[];
	flatrate?: Provider[];
}

interface Data {
	id: number;
	results: Record<string, CountryData>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function uniqBy<T>(arr: T[], key: (item: T) => any): T[] {
	const seen = new Set();
	return arr.filter((item) => {
		const k = key(item);
		return seen.has(k) ? false : seen.add(k);
	});
}

function getProviders(results: Data["results"]) {
	const providers: Providers = {
		buy: [],
		rent: [],
		ads: [],
		flatrate: [],
	};

	for (const country in results) {
		const countryData = results[country];
		if (countryData.rent) {
			providers.rent = providers.rent?.concat(
				uniqBy(countryData.rent, (item) => item.provider_name)
			);
		}
		if (countryData.ads) {
			providers.ads = providers.rent?.concat(
				uniqBy(countryData.ads, (item) => item.provider_name)
			);
		}
		if (countryData.flatrate) {
			providers.flatrate = providers.rent?.concat(
				uniqBy(countryData.flatrate, (item) => item.provider_name)
			);
		}
		if (countryData.buy) {
			providers.buy = providers.buy?.concat(
				uniqBy(countryData.buy, (item) => item.provider_name)
			);
		}
	}

	return filterUniqueProviders(providers);
}

function filterUniqueProviders(data: Providers): Providers {
	const filteredProviders: { buy?: Provider[]; rent?: Provider[] } = {};

	if (data.buy) {
		filteredProviders.buy = data.buy.reduce((acc, current) => {
			const existingIndex = acc.findIndex(
				(item) => item.provider_id === current.provider_id
			);
			if (existingIndex === -1) {
				acc.push(current);
			}
			return acc;
		}, [] as Provider[]);
	}

	if (data.rent) {
		filteredProviders.rent = data.rent.reduce((acc, current) => {
			const existingIndex = acc.findIndex(
				(item) => item.provider_id === current.provider_id
			);
			if (existingIndex === -1) {
				acc.push(current);
			}
			return acc;
		}, [] as Provider[]);
	}

	return filteredProviders;
}

export default getProviders;

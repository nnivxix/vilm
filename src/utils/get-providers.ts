import type {
	CountryData,
	Provider,
	ProviderInfo,
	WatchType,
} from "@/types/providers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function uniqBy<T>(arr: T[], key: (item: T) => any): T[] {
	const seen = new Set();
	return arr.filter((item) => {
		const k = key(item);
		return seen.has(k) ? false : seen.add(k);
	});
}

function getProviders(results: Provider) {
	const providers: WatchType = {
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

function filterUniqueProviders(data: CountryData): WatchType {
	const filteredProviders: WatchType = {};

	if (data.buy) {
		filteredProviders.buy = data.buy.reduce((acc: ProviderInfo[], current) => {
			const existingIndex = acc.findIndex(
				(item: ProviderInfo) => item.provider_id === current.provider_id
			);
			if (existingIndex === -1) {
				acc.push(current);
			}
			return acc;
		}, []);
	}

	if (data.rent) {
		filteredProviders.rent = data.rent.reduce(
			(acc: ProviderInfo[], current) => {
				const existingIndex = acc.findIndex(
					(item: ProviderInfo) => item.provider_id === current.provider_id
				);
				if (existingIndex === -1) {
					acc.push(current);
				}
				return acc;
			},
			[]
		);
	}
	if (data.ads) {
		filteredProviders.ads = data.ads.reduce((acc: ProviderInfo[], current) => {
			const existingIndex = acc.findIndex(
				(item: ProviderInfo) => item.provider_id === current.provider_id
			);
			if (existingIndex === -1) {
				acc.push(current);
			}
			return acc;
		}, []);
	}
	if (data.flatrate) {
		filteredProviders.flatrate = data.flatrate.reduce(
			(acc: ProviderInfo[], current) => {
				const existingIndex = acc.findIndex(
					(item) => item.provider_id === current.provider_id
				);
				if (existingIndex === -1) {
					acc.push(current);
				}
				return acc;
			},
			[]
		);
	}

	return filteredProviders;
}

export default getProviders;

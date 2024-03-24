export interface ProvidersResponse {
	id: number;
	results: Provider;
}

export interface ProviderInfo {
	logo_path: string;
	provider_id: number;
	provider_name: string;
	display_priority: number;
}

export interface Provider {
	[country: string]: CountryData;
}

export interface CountryData {
	link?: string;
	rent?: ProviderInfo[];
	buy?: ProviderInfo[];
	ads?: ProviderInfo[];
	flatrate?: ProviderInfo[];
}

export interface WatchType {
	rent?: ProviderInfo[];
	buy?: ProviderInfo[];
	ads?: ProviderInfo[];
	flatrate?: ProviderInfo[];
}

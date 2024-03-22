export interface Providers {
	id: number;
	results: {
		[countryCode: string]: {
			link: string;
			rent?: Info[];
			buy?: Info[];
			flatrate?: Info[];
		};
	};
}

export interface Info {
	logo_path: string;
	provider_id: number;
	provider_name: string;
	display_priority: number;
}

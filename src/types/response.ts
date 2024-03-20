export interface Response<T> {
	page: number;
	results: T;
	total_pages: number;
	total_results: number;
}

export interface MovieTv {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title?: string;
	original_language: string;
	original_title?: string;
	overview: string;
	poster_path: string;
	media_type: string;
	genre_ids: number[];
	popularity: number;
	release_date?: string;
	video?: boolean;
	vote_average: number;
	vote_count: number;
	name?: string;
	original_name?: string;
	first_air_date?: string;
	origin_country?: string[];
}

export interface SimilarTv {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	first_air_date: string;
	name: string;
	vote_average: number;
	vote_count: number;
}

export interface SimilarMovie {
	adult: boolean;
	backdrop_path?: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

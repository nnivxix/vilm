import type { Images, Video } from "./media";
import type { Movie } from "./movie";
import type { ProvidersResponse } from "./providers";
import type { Tv } from "./tv";

export interface Response<T> {
  page: number;
  results: T;
  total_pages?: number;
  total_results?: number;
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
  backdrop_path: string;
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

export interface AccountStates {
  favorite: boolean;
  rated: boolean;
  watchlist: boolean;
}

export interface AppendResponse {
  images: Images;
  videos: Response<Video[]>;
  account_states: AccountStates;
  "watch/providers": ProvidersResponse;
  similar: Response<SimilarMixed[]>;
}

export interface SimilarMixed extends SimilarMovie, SimilarTv {}
export interface MovieResponse extends Movie, AppendResponse {}
export interface TvResponse extends Tv, AppendResponse {}

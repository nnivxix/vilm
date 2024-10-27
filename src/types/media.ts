/** Images */

export interface Images {
  backdrops: Media[];
  id: number;
  logos: Media[];
  posters: Media[];
}

export interface Media {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

/** Videos */

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
export type VideoType =
  | `${Video["type"]}`
  | "Clip"
  | "Featurette"
  | "Teaser"
  | "Trailer";

export type GroupedVideo = {
  [key in string & VideoType]: Video[];
};

export interface Genre {
  id: number;
  name: string;
}

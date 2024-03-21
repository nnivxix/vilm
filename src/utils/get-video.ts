import { Video } from "@/types/movie";
export interface Media {
	iso_639_1: string; // Two-letter ISO language code
	iso_3166_1: string; // Two-letter ISO country code
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
}
type MediaType =
	| `${Media["type"]}`
	| "Clip"
	| "Featurette"
	| "Teaser"
	| "Trailer";

export type GroupedMedia = {
	[key in string & MediaType]: Media[];
};

function getVideo(videos: Video[]): Video | null {
	const filteredByGroup = groupBy<Video>(videos, "type");

	const clips = filteredByGroup["Clip"] ?? [];
	const featurettes = filteredByGroup["Featurette"] ?? [];
	const trailers = filteredByGroup["Trailer"] ?? [];
	const teasers = filteredByGroup["Teaser"] ?? [];

	if (trailers.length) {
		return pickOneVideo(trailers);
	}
	if (teasers.length) {
		return pickOneVideo(teasers);
	}
	if (clips.length) {
		return pickOneVideo(clips);
	}
	if (featurettes.length) {
		return pickOneVideo(featurettes);
	}
	return null;
}

function groupBy<T>(collection: T[], key: keyof T): GroupedMedia {
	const groupedResult = collection.reduce((previous, current) => {
		if (!previous[current[key]]) {
			previous[current[key]] = [] as T[];
		}

		previous[current[key]].push(current);
		return previous;
	}, {} as any); // tried to figure this out, help!!!!!

	return groupedResult;
}

function pickOneVideo(videos: Video[]) {
	const randomIndex = Math.floor(Math.random() * videos.length);
	return videos[randomIndex];
}

export default getVideo;

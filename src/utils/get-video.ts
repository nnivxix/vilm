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

	const mediaTypes: MediaType[] = ["Trailer", "Teaser", "Clip", "Featurette"];

	for (const mediaType of mediaTypes) {
		const media = filteredByGroup[mediaType];
		if (media && media.length) {
			return pickOneVideo(media);
		}
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}, {} as any); // tried to figure this out, help!!!!!

	return groupedResult;
}

function pickOneVideo(videos: Video[]) {
	const randomIndex = Math.floor(Math.random() * videos.length);
	return videos[randomIndex];
}

export default getVideo;

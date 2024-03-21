import type { GroupedVideo, Video, VideoType } from "@/types/media";

function getVideo(videos: Video[]): Video | null {
	const filteredByGroup = groupBy<Video>(videos, "type");

	const mediaTypes: VideoType[] = ["Trailer", "Teaser", "Clip", "Featurette"];

	for (const mediaType of mediaTypes) {
		const media = filteredByGroup[mediaType];
		if (media && media.length) {
			return pickOneVideo(media);
		}
	}

	return null;
}

function groupBy<T>(collection: T[], key: keyof T): GroupedVideo {
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

import { Backdrop } from "@/types/movie";

function pickRandomImages(images: Backdrop[]) {
	if (!Array.isArray(images)) {
		throw new Error("Not Array array!");
	}

	if (images.length < 7) {
		return images;
	}

	const shuffledIndexes = [...images.keys()].sort(() => Math.random() - 0.5);
	const shuffledImages = shuffledIndexes
		.slice(0, 7)
		.map((index) => images[index]);

	return shuffledImages;
}

export default pickRandomImages;

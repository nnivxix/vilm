import { Media } from "@/types/media";

function pickRandomImages(images: Media[], length: number = 5) {
  if (!Array.isArray(images)) {
    throw new Error("Not Array array!");
  }

  if (images.length < length) {
    return images;
  }

  const shuffledIndexes = [...images.keys()].sort(() => Math.random() - 0.5);
  const shuffledImages = shuffledIndexes
    .slice(0, length)
    .map((index) => images[index]);

  return shuffledImages;
}

export default pickRandomImages;


import type { SyntheticEvent } from "react";
import type { TypeImage } from "@/hooks/useImageFallback";
import useImageFallback from "@/hooks/useImageFallback";

// forward props like shadcn
interface ImageProps {
	src: string;
	alt: string;
	type: TypeImage;
}
export default function Image({ src, alt, type }: ImageProps) {
	const { fallback } = useImageFallback(type);

	const imageFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
		event.currentTarget.src = fallback;
	};
	const imageLoaded = (event: SyntheticEvent<HTMLImageElement, Event>) => {
		event.currentTarget.src = src;
	};

	return (
		<img
			src={fallback}
			alt={alt}
			onError={imageFallback}
			onLoad={imageLoaded}
		/>
	);
}

import type { ImgHTMLAttributes, SyntheticEvent } from "react";
import type { TypeImage } from "@/hooks/useImageFallback";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
	type: TypeImage;
}
export default function RImage({ src, alt, type, ...props }: ImageProps) {
	const { fallback } = useImageFallback(type);
	const [loaded, setLoaded] = useState(false);


	const imageFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
		event.currentTarget.src = fallback;
	};
	const imageLoaded = (event: SyntheticEvent<HTMLImageElement, Event>) => {
		if (loaded) return;

		event.currentTarget.src = src;
		setLoaded(true)
	};

	return (
		<img
			{...props}
			src={fallback}
			alt={alt}
			loading="lazy"
			onError={imageFallback}
			onLoad={imageLoaded}
		/>
	);
}

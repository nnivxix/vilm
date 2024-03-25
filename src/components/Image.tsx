import type { SyntheticEvent } from "react";
import type { TypeImage } from "@/hooks/useImageFallback";
import useImageFallback from "@/hooks/useImageFallback";
import React from "react";

type ImageProps = React.HTMLAttributes<HTMLImageElement> & {
	src: string;
	alt: string;
	type: TypeImage;
};
export default function Image(props: ImageProps) {
	const { src, alt, type, ...restProps } = props;
	const { fallback } = useImageFallback(type);

	const imageFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
		event.currentTarget.src = fallback;
	};
	const imageLoaded = (event: SyntheticEvent<HTMLImageElement, Event>) => {
		event.currentTarget.src = src;
	};

	return (
		<img
			{...restProps}
			src={fallback}
			alt={alt}
			onError={imageFallback}
			onLoad={imageLoaded}
		/>
	);
}

import { useEffect, useState } from "react";

export type TypeImage = "poster" | "backdrop";

const useImageFallback = (type: TypeImage) => {
	const [fallback, setFallback] = useState<string>("");

	useEffect(() => {
		switch (type) {
			case "poster":
				setFallback("/poster-fallback.png");
				break;
			case "backdrop":
				setFallback("/backdrop-fallback.png");
				break;
			default:
				setFallback("/poster-fallback.png");
		}
	}, [setFallback, type]);

	return {
		fallback,
	};
};

export default useImageFallback;

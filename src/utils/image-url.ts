interface ImageUrl {
	path: string;
	size?: "original" | "w500" | "w300";
}

function imageUrl({ path, size = "w300" }: ImageUrl): string {
	return `https://image.tmdb.org/t/p/${size}/${path}`;
}

export default imageUrl;

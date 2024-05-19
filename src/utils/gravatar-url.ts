interface GravatarOption {
	size: number;
	default:
		| "robohash"
		| "blank"
		| "retro"
		| "wavatar"
		| "monsterid"
		| "identicon"
		| "mp";
}
/**
 * @example https://secure.gravatar.com/avatar/c34d28f2d995cb2ef354ee6c93732a6a?s=512&d=mp&r=g
 * @link https://docs.gravatar.com/api/avatars/images/
 * @link https://blog.sachinchaurasiya.dev/how-to-use-gravatar-api-to-render-user-public-avatar
 */

const gravatarUrl = (
	hash?: string,
	option: GravatarOption = {
		size: 256,
		default: "mp",
	}
): string => {
	return `https://secure.gravatar.com/avatar/${hash}?s=${option?.size}&d=${option.default}`;
};

export default gravatarUrl;

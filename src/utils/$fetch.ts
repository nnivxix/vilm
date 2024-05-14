import config from "@/config";

interface Option {
	headers: { [key: string]: string };
	method?: string;
	body?: unknown;
	defaultToken?: boolean;
}

const { apiUrl, token } = config;

const $fetch = (path: string, option?: Option) => {
	const useDefaultToken = option?.defaultToken ?? true;
	const headers = {
		Accept: "application/json",
		Authorization: useDefaultToken ? "Bearer " + token : "",
		...option?.headers,
	};

	const method = option?.method ?? "GET";

	return fetch(`${apiUrl}${path}`, {
		headers: {
			...headers,
		},
		method,
		body: JSON.stringify(option?.body),
	});
};

export default $fetch;

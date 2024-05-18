import config from "@/config";

interface Option {
	headers: { [key: string]: string };
	method?: string;
	body?: unknown;
	defaultToken?: boolean;
}

const { apiUrl, token } = config;

const $fetch = async <T>(path: string, option?: Option): Promise<T> => {
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
	}) as Promise<T>;
};

export default $fetch;

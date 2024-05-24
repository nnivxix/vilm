import config from "@/config";

interface Option {
  headers?: { [key: string]: string };
  method?: string;
  body?: { [key: string]: string | boolean | number };
  defaultToken?: boolean;
}

export interface ResponseMessage {
  status_code: number;
  status_message: string;
  success: boolean;
}

const { apiUrl, token } = config;

const $fetch = async <T>(path: string, option?: Option) => {
  const useDefaultToken = option?.defaultToken ?? true;
  const headers = {
    Accept: "application/json",
    "content-type": "application/json",
    Authorization: useDefaultToken ? "Bearer " + token : "",
    ...option?.headers,
  };
  const method = option?.method ?? "GET";

  const response: Response = await fetch(`${apiUrl}${path}`, {
    headers: {
      ...headers,
    },
    method,
    ...(method !== "GET" && { body: JSON.stringify({ ...option?.body }) }),
  });

  const data: T = await response.json();
  const isError = !response.ok;
  const error: ResponseMessage | null = isError
    ? (data as ResponseMessage)
    : null;

  return { response, data, error };
};

export default $fetch;

import config from "@/config";

const { apiUrl, token: defaultToken } = config;
const fetcher = (path: string, {
  useDefaultToken = true,
  token = useDefaultToken ? defaultToken : undefined,
} : {
  useDefaultToken?: boolean;
  // If useDefaultToken is false, token must be provided
  // If useDefaultToken is true, token can be undefined
  // If token is undefined, defaultToken will be used
  token?: string | undefined,
} = {}) => {
  const url = apiUrl + path;
  let userToken = defaultToken;

  if (!useDefaultToken) {
    userToken = token;
  }

  return fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  }).then((res) => res.json());
};

export default fetcher;
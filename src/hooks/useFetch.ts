"use client";

import { useEffect, useState } from "react";
import config from "../config";

const API_TOKEN = config.token;

interface Params {
  [key: string]: string | boolean | null | number;
}

/**
 * @description only GET Request
 * @param path
 * @param params
 * @returns
 */
function useFetch<DataT>(path: string, params?: Params) {
  const [data, setData] = useState<DataT>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryParams =
    "?" +
    Object.keys({ ...params })
      .map((key) => {
        const value = params ? params[key] : null;
        return value !== null
          ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          : null;
      })
      .join("&");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${config.apiUrl}${path}${queryParams}`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + API_TOKEN,
          },
        });

        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();

        setIsLoading(false);
        setData(json);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [path, queryParams]);
  return { data, isLoading, error };
}

export default useFetch;

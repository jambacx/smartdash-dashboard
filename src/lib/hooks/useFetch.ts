import { useState, useEffect } from "react";
import HTTP from "../http";

interface FetchOptions {
  method: "get" | "post" | "put" | "delete";
  bodyData?: Record<string, any>;
}

export const useFetch = (endpoint: string, options: FetchOptions) => {
  const [response, setResponse] = useState<any>(null);
  const [status, setStatus] = useState("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setStatus("pending");

    const fetchData = async () => {
      try {
        let response;

        switch (options.method) {
          case "post":
            response = await HTTP.post(endpoint, { body: options.bodyData });
            break;
          case "delete":
            response = await HTTP.remove(endpoint, { body: options.bodyData });
            break;
          case "get":
            response = await HTTP.get(endpoint);
            break;
        }

        setResponse(response);
        setStatus("completed");
        setIsLoading(false);
      } catch (err: any) {
        setError(err);
        setStatus("error");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, options.method, JSON.stringify(options.bodyData)]);

  return {
    response,
    status,
    isLoading,
    error,
  };
};



// Rename `useFetch` to `fetchFromAPI` or any other suitable name
export const fetchFromAPI = async (endpoint: any, options: any) => {
  try {
    let response;
    switch (options.method) {
      case 'post':
        response = await HTTP.post(endpoint, { body: options.bodyData });
        break;
      case 'delete':
        response = await HTTP.remove(endpoint);
        break;
      case 'get':
      default:
        response = await HTTP.get(endpoint);
        break;
    }
    return { response };
  } catch (error) {
    return { error };
  }
};

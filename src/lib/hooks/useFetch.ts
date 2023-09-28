import { useState, useEffect } from "react";
import HTTP from "../http";

type FetchStatus = "idle" | "loading" | "success" | "error";

export const useFetch = <T>(url: string, options?: HTTP.RequestConfig, method: "get" | "post" | "put" = "get") => {
    const [data, setData] = useState<T | null>(null);
    const [status, setStatus] = useState<FetchStatus>("idle");
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        (async () => {
            setStatus("loading");
            setError(null);

            try {
                let response: T;
                if (method === "get") {
                    response = await HTTP.get<T>(url, options);
                } else if (method === "post") {
                    response = await HTTP.post<T>(url, options);
                } else if (method === "put") {
                    response = await HTTP.put<T>(url, options);
                } else {
                    throw new Error(`Unsupported method: ${method}`);
                }

                setData(response);
                setStatus("success");
            } catch (err) {
                setError(err);
                setStatus("error");
            }
        })();
    }, [url, JSON.stringify(options), method]);

    return {
        data,
        status,
        isLoading: status === "loading",
        error,
    };
};

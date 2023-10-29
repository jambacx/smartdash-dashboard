import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

namespace HTTP {
    export interface RequestConfig extends AxiosRequestConfig<Record<string, any>> {
        params?: Record<string, any>;
        body?: Record<string, any>;
    }

    const instance: AxiosInstance = axios.create({
        baseURL: "/api",
        withCredentials: false,
        proxy: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    });

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("authToken");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response.data;
        },
        (error) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.code &&
                error.response.data.code != 102
            ) {
                return error.response.data;
            }
            return Promise.reject(error);
        }
    );

    const request = async <T>(options: AxiosRequestConfig): Promise<T> => {
        try {
            if (options.url) {
                // options.url = encodeURI(options.url);
            }

            return await instance.request<T, any>({
                ...options,
            });
        } catch (error: any) {
            if (error && error.response && error.response.data) {
                throw error.response.data;
            } else if (error) {
                throw error;
            }
            throw new Error("Unhandled error");
        }
    };

    export const get = async <T>(
        url: string,
        options?: RequestConfig
    ): Promise<T> => {

        return await request<T>({
            method: "GET",
            url,
            params: options?.params,
            ...options,
        });
    };

    export const post = async <T>(
        url: string,
        options?: RequestConfig
    ): Promise<T> => {
        return await request<T>({
            method: "POST",
            url,
            ...options,
            data: options?.body,
        });
    };

    export const put = async <T>(
        url: string,
        options?: RequestConfig
    ): Promise<T> => {
        return await request<T>({
            method: "PUT",
            url,
            ...options,
            data: options?.body,
        });
    };
}

export default HTTP;

import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import nookies from 'nookies';
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace HTTP {
  export interface RequestConfig
    extends AxiosRequestConfig<Record<string, any>> {
    params?: Record<string, any>;
    body?: Record<string, any>;
  }

  const instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    config => {
      const cookies = nookies.get();
      const token = cookies?.authToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    async error => {
      return await Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      console.log(error?.response, error?.message);
      if (error.response?.data?.code && error.response.data.code !== 102) {
        return error.response.data;
      }
      return Promise.reject(error);
    },
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
      if (error?.response?.data) {
        throw error.response.data;
      } else if (error) {
        throw error;
      }
      throw new Error('Unhandled error');
    }
  };

  export const get = async <T>(
    url: string,
    options?: RequestConfig,
  ): Promise<T> => {
    return await request<T>({
      method: 'GET',
      url,
      params: options?.params,
      ...options,
    });
  };

  export const post = async <T>(
    url: string,
    options?: RequestConfig,
  ): Promise<T> => {
    return await request<T>({
      method: 'POST',
      url,
      ...options,
      data: options?.body,
    });
  };

  export const remove = async <T>(
    url: string,
    options?: RequestConfig,
  ): Promise<T> => {
    return await request<T>({
      method: 'DELETE',
      url,
      ...options,
      data: options?.body,
    });
  };

  export const put = async <T>(
    url: string,
    options?: RequestConfig,
  ): Promise<T> => {
    return await request<T>({
      method: 'PUT',
      url,
      ...options,
      data: options?.body,
    });
  };
}

export default HTTP;

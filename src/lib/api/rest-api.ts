import Axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { env } from '@/config/env';
import { toast } from 'sonner';

export const baseApi = Axios.create({
  baseURL: env.REST_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

baseApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
});

baseApi.interceptors.response.use(
  response => {
    return response;
  },
  (error: unknown) => {
    if (error instanceof AxiosError) {
      const { response, status } = error;

      if (
        status === 400 &&
        response?.data?.code_name === 'bad_request' &&
        typeof response.data.details === 'string'
      ) {
        toast.error(response.data.details);
      } else if (error.code === 'ERR_NETWORK') {
        toast.error('خطایی در برقراری ارتباط با سرور رخ داد');
      }
    }

    return Promise.reject(error);
  },
);

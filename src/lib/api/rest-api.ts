import Axios, { InternalAxiosRequestConfig } from 'axios';

import { env } from '@/config/env';

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
  error => {
    return Promise.reject(error);
  },
);

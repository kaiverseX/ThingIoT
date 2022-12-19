import {AxiosRequestConfig, AxiosResponse} from 'axios';
import axiosInstance from '~/config/httpConfig/axiosInstance';
import {usePersistStore} from '~/store';

const HttpConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const getCustomHttpConfig = () => {
  const accessToken = usePersistStore.getState().accessToken;
  const customHttpConfig = {...HttpConfig};
  if (customHttpConfig.headers && accessToken) {
    customHttpConfig.headers.Authorization = `Bearer ${accessToken}`;
  }
  return customHttpConfig;
};

const apiGet = <T>(url: string) =>
  new Promise<AxiosResponse<T>['data']>((resolve, reject) => {
    // Before trigger axios request, add logic if needed
    return axiosInstance.get<T>(url, getCustomHttpConfig()).then(({data}) => resolve(data), reject);
  });

const apiPost = <T>(url: string, payload?: unknown, config?: AxiosRequestConfig) =>
  new Promise<AxiosResponse<T>['data']>((resolve, reject) => {
    // Before trigger axios request, add logic if needed
    return axiosInstance
      .post<T>(url, payload, {...getCustomHttpConfig(), ...config})
      .then(({data}) => resolve(data), reject);
  });

const apiGetNonAuth = <T>(url: string) =>
  new Promise<AxiosResponse<T>['data']>((resolve, reject) => {
    // Before trigger axios request, add logic if needed
    return axiosInstance.get<T>(url, HttpConfig).then(({data}) => resolve(data), reject);
  });

const apiPostNonAuth = <T>(url: string, payload?: unknown, config?: AxiosRequestConfig) =>
  new Promise<AxiosResponse<T>['data']>((resolve, reject) => {
    // Before trigger axios request, add logic if needed
    return axiosInstance
      .post<T>(url, payload, {...HttpConfig, ...config})
      .then(({data}) => resolve(data), reject);
  });

export const http = {
  get: apiGet,
  post: apiPost,
};

export const httpNonAuth = {
  get: apiGetNonAuth,
  post: apiPostNonAuth,
};

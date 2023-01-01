import {AxiosRequestConfig, AxiosResponse} from 'axios';
import axiosInstance from '~/config/httpConfig/axiosInstance';
import {usePersistStore} from '~/store';

const HttpConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const getAuthConfig = (config?: AxiosRequestConfig) => {
  const accessToken = usePersistStore.getState().accessToken;
  const customHttpConfig = {...HttpConfig, ...config};
  if (customHttpConfig.headers && accessToken) {
    customHttpConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  // Add paramsSerializer to adapt with complex params structure, even directly into axiosInstance, if needed.
  // const queryParams = config?.params
  // if(queryParams){
  //   customHttpConfig.paramsSerializer = ...
  // }

  return customHttpConfig;
};

const apiGet = <T>(url: string, config?: AxiosRequestConfig) =>
  new Promise<AxiosResponse<T>['data']>((resolve, reject) => {
    // Before trigger axios request, add logic if needed
    return axiosInstance.get<T>(url, getAuthConfig(config)).then(({data}) => resolve(data), reject);
  });

const apiPost = <T>(url: string, payload?: unknown, config?: AxiosRequestConfig) =>
  new Promise<AxiosResponse<T>['data']>((resolve, reject) => {
    // Before trigger axios request, add logic if needed
    return axiosInstance
      .post<T>(url, payload, getAuthConfig(config))
      .then(({data}) => resolve(data), reject);
  });

const apiGetNonAuth = <T>(url: string, config?: AxiosRequestConfig) =>
  new Promise<AxiosResponse<T>['data']>((resolve, reject) => {
    // Before trigger axios request, add logic if needed
    return axiosInstance
      .get<T>(url, {...HttpConfig, ...config})
      .then(({data}) => resolve(data), reject);
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

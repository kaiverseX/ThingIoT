import {showNotification} from '@mantine/notifications';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {findNotiConfig} from '~/helper/notification';
import {ErrorCode} from '~/types/http';

const httpConfig: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_ORIGIN,
  timeout: 10000,
};
const axiosInstance = axios.create(httpConfig);

// Additional logic before request is sent
const handleBeforeRequest = (config: AxiosRequestConfig) => {
  /**
   * We should NOT add `Authorization` into headers of every request.
   *
   * If needed, carefully consider the risk then uncomment the logic below to add `Authorization` header.
   */
  // const accessToken = usePersistStore.getState().accessToken;
  // if (config.headers && accessToken) {
  //   config.headers.Authorization = `Bearer ${accessToken}`;
  // }

  return config;
};

const handleResponseError = (error: Error | AxiosError | null) => {
  if (!navigator.onLine) {
    showNotification(findNotiConfig(ErrorCode.ERR_NETWORK));

    return Promise.reject(error);
  }

  const notiConfig = findNotiConfig(ErrorCode.ERR); // an unknown error noti.
  if (error === null || !axios.isAxiosError(error)) {
    showNotification(notiConfig);

    return Promise.reject(error);
  }

  // Show a noti with server error msg
  const message = error.response?.data?.message;
  if (message) {
    notiConfig.message = message;
  }
  showNotification(notiConfig);

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(handleBeforeRequest, (error) => Promise.reject(error));
axiosInstance.interceptors.response.use((response) => response, handleResponseError);

export default axiosInstance;

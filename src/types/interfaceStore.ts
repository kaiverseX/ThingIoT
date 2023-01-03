import {MantineThemeColors} from '@mantine/core';
import {IBreadcrumbs, IUserData} from './interfaceCommon';

export interface IAuthState {
  uid?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface IAuth extends IAuthState {
  setUID: (uid: string) => void;
  setToken: (token: {accessToken: string; refreshToken: string}) => void;
  resetAuthStore: () => void;
}

export interface IUserStore {
  userData: IUserData;
  setUserData: (test: IUserData) => void;
  resetUserStore: () => void;
}

export interface IAuthState {
  uid?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface ISystemPersistState {
  theme: keyof MantineThemeColors;
}

export interface ISystemPersistStore extends ISystemPersistState {
  setTheme: (theme: keyof MantineThemeColors) => void;
  resetPersistedSystemStore: () => void;
}

export interface ISystemState {
  contentHeader?: {
    title?: string;
    breadcrumbData?: IBreadcrumbs['data'];
  };
}

export interface ISystemStore extends ISystemState {
  setContentHeader: (contentHeader: ISystemState['contentHeader']) => void;
  resetSystemStore: () => void;
}

export interface IPersistStore extends IAuth, IUserStore, ISystemPersistStore {}

export type IStore = ISystemStore;

import {MantineThemeColors} from '@mantine/core';
import {IAccountInfo, IUserData} from './interfaceCommon';

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

  theme: keyof MantineThemeColors;
  setTheme: (theme: keyof MantineThemeColors) => void;
  resetUserStore: () => void;
}

export interface ISystemStore {
  accountInfo?: IAccountInfo;
  setAccountInfo: (accountInfo: IAccountInfo) => void;
  resetSystemStore: () => void;
}

export interface IPersistStore extends IAuth, IUserStore {}

export type IStore = ISystemStore;

import {IAccountInfo, IUserData} from './interfaceCommon';

export interface IAuth {
  uid?: string;
  accessToken?: string;
  refreshToken?: string;

  setUID: (uid: string) => void;
  setToken: (token: {accessToken: string; refreshToken: string}) => void;
  resetAuthStore: () => void;
}

export interface IUserStore {
  userData: IUserData;
  setUserData: (test: IUserData) => void;
  resetUserStore: () => void;
}

export interface ISystemStore {
  accountInfo?: IAccountInfo;
  setAccountInfo: (accountInfo: IAccountInfo) => void;
  resetSystemStore: () => void;
}

export interface IPersistStore extends IAuth, IUserStore {}

export type IStore = ISystemStore;

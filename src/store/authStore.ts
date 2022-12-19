import {StateCreator} from 'zustand';
import {IAuth, IAuthState, IPersistStore} from '~/types/interfaceStore';

export const defaultAuthState: IAuthState = {
  uid: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

export const createAuthSlice: StateCreator<
  IPersistStore,
  [['zustand/persist', unknown]],
  [],
  IAuth
> = (set) => ({
  setToken: ({accessToken, refreshToken}) => set(() => ({accessToken, refreshToken})),
  setUID: (uid) => set(() => ({uid})),
  resetAuthStore: () => set(defaultAuthState),
});

import {StateCreator} from 'zustand';
import {IAuth, IPersistStore} from '~/types/interfaceStore';

export const createAuthSlice: StateCreator<
  IPersistStore,
  [['zustand/persist', unknown]],
  [],
  IAuth
> = (set) => ({
  setToken: ({accessToken, refreshToken}) => set(() => ({accessToken, refreshToken})),
  setUID: (uid) => set(() => ({uid})),
  resetAuthStore: () => set({}, true),
});

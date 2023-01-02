import {StateCreator} from 'zustand';
import {IUserData} from '~/types/interfaceCommon';
import {IPersistStore, IUserStore} from '~/types/interfaceStore';

export const defaultUserData: IUserData = {
  email: '',
  authority: '',
  firstName: '',
  lastName: '',
};

export const createUserSlice: StateCreator<
  IPersistStore,
  [['zustand/persist', unknown]],
  [],
  IUserStore
> = (set) => ({
  userData: defaultUserData,
  setUserData: (userData) => set(() => ({userData})),
  resetUserStore: () => set(() => ({userData: defaultUserData})),
});

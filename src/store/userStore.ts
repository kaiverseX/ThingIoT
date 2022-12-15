import {MantineThemeColors} from '@mantine/core';
import {StateCreator} from 'zustand';
import {IUserData} from '~/types/interfaceCommon';
import {IPersistStore, IUserStore} from '~/types/interfaceStore';

export const defaultUserData: IUserData = {
  setting: {newOnBot: false},
};

export const defaultTheme: keyof MantineThemeColors = 'teal';

export const createUserSlice: StateCreator<
  IPersistStore,
  [['zustand/persist', unknown]],
  [],
  IUserStore
> = (set) => ({
  userData: defaultUserData,
  setUserData: (userData) => set(() => ({userData})),
  theme: defaultTheme,
  setTheme: (theme) => set(() => ({theme})),
  resetUserStore: () => set(() => ({userData: defaultUserData}), true),
});

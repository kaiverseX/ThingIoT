import {StateCreator} from 'zustand';
import {
  IPersistStore,
  ISystemPersistStore,
  ISystemPersistState,
  ISystemStore,
  ISystemState,
} from '~/types/interfaceStore';

const defaultPersistState: ISystemPersistState = {
  theme: 'teal',
};

const defaultState: ISystemState = {
  contentHeader: undefined,
};

export const createSystemSlice: StateCreator<ISystemStore> = (set) => ({
  ...defaultState,
  setContentHeader: (contentHeader) => set(() => ({contentHeader})),
  resetSystemStore: () => set(defaultState),
});

export const createSystemPersistSlice: StateCreator<
  IPersistStore,
  [['zustand/persist', unknown]],
  [],
  ISystemPersistStore
> = (set) => ({
  ...defaultPersistState,
  setTheme: (theme) => set(() => ({theme})),
  resetPersistedSystemStore: () => set(defaultPersistState),
});

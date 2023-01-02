import {StateCreator} from 'zustand';
import {
  IPersistStore,
  ISystemPersistStore,
  ISystemPersistState,
  ISystemStore,
} from '~/types/interfaceStore';

const defaultSystemState: ISystemPersistState = {
  theme: 'teal',
};

export const createSystemSlice: StateCreator<ISystemStore> = () => ({
  resetSystemStore: () => undefined,
});

export const createSystemPersistSlice: StateCreator<
  IPersistStore,
  [['zustand/persist', unknown]],
  [],
  ISystemPersistStore
> = (set) => ({
  ...defaultSystemState,
  setTheme: (theme) => set(() => ({theme})),
  resetPersistedSystemStore: () => set(defaultSystemState),
});

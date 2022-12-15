import {StateCreator} from 'zustand';
import {ISystemStore} from '~/types/interfaceStore';

export const createSystemSlice: StateCreator<ISystemStore> = (set) => ({
  setAccountInfo: (accountInfo) => set(() => ({accountInfo})), // accountInfo is currently unused
  resetSystemStore: () => set(() => ({}), true),
});

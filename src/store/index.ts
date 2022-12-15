import create from 'zustand';
import {persist} from 'zustand/middleware';

import {IPersistStore, IStore} from '~/types/interfaceStore';
import {createAuthSlice} from './authStore';
import {createSystemSlice} from './systemStore';
import {createUserSlice} from './userStore';

export const usePersistStore = create<IPersistStore>()(
  persist(
    (...store) => ({
      ...createAuthSlice(...store),
      ...createUserSlice(...store),
    }),
    {
      name: 'keepverse',
      partialize: ({uid, userData, accessToken, theme}) => ({uid, userData, accessToken, theme}),
      getStorage: () => localStorage, // create new store if needs to use other storage (eg: sessionStorage)
    },
  ),
);

export const useStores = create<IStore>()((...store) => ({
  ...createSystemSlice(...store),
}));

import create from 'zustand';
import {persist} from 'zustand/middleware';

import {IPersistStore, IStore} from '~/types/interfaceStore';
import {createAuthSlice} from './authStore';
import {createSystemPersistSlice, createSystemSlice} from './systemStore';
import {createUserSlice} from './userStore';

/**
 * Persisted all selected state (filter by `partialize`) into `localStorage`.
 *
 * Create another store if needs to use other storage (eg: `sessionStorage`)
 */
export const usePersistStore = create<IPersistStore>()(
  persist(
    (...store) => ({
      ...createAuthSlice(...store),
      ...createUserSlice(...store),
      ...createSystemPersistSlice(...store),
    }),
    {
      name: 'keepverse',
      partialize: ({uid, userData, accessToken, theme}) => ({uid, userData, accessToken, theme}),
    },
  ),
);

export const useStores = create<IStore>()((...store) => ({
  ...createSystemSlice(...store),
}));

import { defineStore } from 'pinia'
import { store } from '@/store'
import { IAppType } from './types'
export const useAppStore = defineStore({
  id: 'app',
  state: (): IAppType => ({
    collapse: false,
  }),
  actions: {
    setCollapse(e: boolean) {
      this.collapse = e
    },
  },
})

export function useAppStoreHook() {
  return useAppStore(store)
}

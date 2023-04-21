import { defineStore } from 'pinia'
import { store } from '@/store'
import { userLogin } from '@/api/user/user'
import { IUserLogin } from '@/api/user/types'
import { setToken } from '@/utils/auth'
import router from '@/router'
import { IUserType } from './types'
export const useUserStore = defineStore({
  id: 'user',
  state: () :IUserType => ({
    username: '',
    token: null
  }),
  actions: {
    SET_USERNAME(username: string) {
      this.username = username
    },
    async userLoginFn(data: IUserLogin) {
      const res = await userLogin(data)
      console.log(res)
      setToken(res.token)
      this.token = res.token
      router.push('/base/dashboard')
    }
  },
})

export function useUserStoreHook() {
  return useUserStore(store)
}

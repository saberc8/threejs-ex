import { useUserStoreHook } from '@/store/modules/user'

const TOKEN_KEY = 'TOKEN_KEY'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function setToken(token: string) {
  return localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
  const { SET_USERNAME } = useUserStoreHook()
  SET_USERNAME('')
}

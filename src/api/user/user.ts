import { createAxios } from '@/utils/request'
import { IUserLogin } from './types'
const request = createAxios({
  baseURL: import.meta.env.VITE_API_URL,
})

export const appList = (params: any): Promise<any> =>
  request.get('/app', { params })

export const userLogin = (data: IUserLogin): Promise<any> =>
  request.post('user/login', data)

export const getUserList = (params: any): Promise<any> =>
  request.get('user/list', { params })

export const addUser = (data: any): Promise<any> =>
  request.post('user/add', data)

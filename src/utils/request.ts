import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getToken, removeToken } from './auth'
import { ElMessage, ElLoading } from 'element-plus'
import router from '@/router'

export const createAxios = (config?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 1000, //超时配置
    ...config, // 自定义配置覆盖基本配置
  })

  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config: any) {
      // 在发送请求之前做些什么
      // const { loading = true } = config
      console.log('config:', config)
      config.headers.token = getToken()
      // if (loading) addLoading()
      return config
    },
    function (error) {
      // 对请求错误做些什么
      ElMessage.error('请求错误')
      return Promise.reject(error)
    },
  )

  // 添加响应拦截器
  instance.interceptors.response.use(
    function (response) {
      // 对响应数据做点什么
      console.log('response:', response)
      const { code, result } = response.data
      if (code === 0) {
        return result
      } else {
        ElMessage.error(result.message)
        return Promise.reject(response.data)
      }
    },
    function (error) {
      // 对响应错误做点什么
      console.log('error-response:', error.response)
      console.log('error-config:', error.config)
      console.log('error-request:', error.request)
      const { code, message } = error.response.data
      console.log('code:', code)
      if (code === 1) {
        ElMessage.error(message)
        removeToken()
        router.push('/login')
        return
      }
      ElMessage({
        message:
          error?.response?.data?.message ||
          error.response?.statusText ||
          '服务端异常',
        type: 'error',
      })
      return Promise.reject(error)
    },
  )
  return instance
}

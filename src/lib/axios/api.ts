import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import Config from 'react-native-config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { refresh } from '../../module/auth/api.ts'
import type { Replace } from '../type/util'

const api = axios.create({
  baseURL: Config.API_URL,
  paramsSerializer: params =>
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(Array.isArray(value) ? value.join(',') : String(value))}`
      )
      .join('&')
})

api.interceptors.request.use(async config => {
  const accessToken = await AsyncStorage.getItem('accessToken')

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

api.interceptors.response.use(
  null,
  async (
    error: Replace<
      AxiosError,
      {
        config: InternalAxiosRequestConfig<unknown> & { isRefreshTry?: boolean }
      }
    >
  ) => {
    if (error.config) {
      if (!error.config.isRefreshTry && error.response?.status === 401) {
        const refreshToken = await AsyncStorage.getItem('refreshToken')
        error.config.isRefreshTry = true

        if (refreshToken) {
          const response = await refresh({ refreshToken })

          await Promise.all([
            AsyncStorage.setItem('accessToken', response.accessToken),
            AsyncStorage.setItem('refreshToken', response.refreshToken)
          ])

          return api.request(error.config)
        }
      }
    }

    return Promise.reject(error)
  }
)

export default api

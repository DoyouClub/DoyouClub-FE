import axios from 'axios'
import Config from 'react-native-config'

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

export default api

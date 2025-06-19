import axios from 'axios'
import { useAuthStore } from '../app/store'

const api = axios.create({
  baseURL: 'https://nu.tipo.lol/api',
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  res => res,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const { refreshToken, accessToken, setAccessToken, logout } = useAuthStore.getState()

      console.log(refreshToken,accessToken,  'eeee');
      
      try {
        const res = await api.post('/auth/refresh', { refreshToken })
        const newAccessToken = res.data.token.accessToken
        setAccessToken(newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (e) {
        logout()
        return Promise.reject(e)
      }
    }

    return Promise.reject(error)
  }
)

export default api

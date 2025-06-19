import { useMutation } from '@tanstack/react-query'
import api from '../../shared/apiClient'
import { useAuthStore } from '../../app/store'

export const useRegister = () =>
  useMutation({
    mutationFn: (data) => api.post('/auth/register', data),
    onSuccess: (res) => {
      const { accessToken, refreshToken } = res.data.token
      useAuthStore.getState().setTokens({ accessToken, refreshToken })
    },
  })

export const useLogin = () =>
  useMutation({
    mutationFn: (data) => api.post('/auth/login', data),
    onSuccess: (res) => {
      const { accessToken, refreshToken } = res.data.token
      useAuthStore.getState().setTokens({ accessToken, refreshToken })
    },
  })

export const useLogout = () =>
  useMutation({
    mutationFn: () => {
      const refreshToken = useAuthStore.getState().refreshToken
      return api.post('/auth/logout', { refreshToken })
    },
    onSuccess: () => {
      useAuthStore.getState().logout()
    },
  })

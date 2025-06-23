import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../shared/apiClient'

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: () => api.get('/products').then(res => res.data),
  })


export const useProduct = id =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => api.get(`/products/${id}`).then(res => res.data),
    enabled: !!id
  })

  export const useCreateProduct = () => {
    const qc = useQueryClient()
    return useMutation({
      mutationFn: (data) => api.post('/products', data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['products'] })
      },
    })
  }
  
export const useUpdateProduct = (id) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.put(`/products/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] })
      qc.invalidateQueries({ queryKey: ['product', id] })
    },
  })
}

export const useDeleteProduct = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.delete(`/products/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../shared/apiClient'

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories').then(res => res.data)
  })

  export const useCreateCategory = () => {
    const qc = useQueryClient()
    return useMutation({
      mutationFn: (data) => api.post('/categories/create', data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['categories'] })
      },
    })
  }
  
  export const useUpdateCategory = () => {
    const qc = useQueryClient()
    return useMutation({
      mutationFn: ({ id, title }) => api.post(`/categories/${id}/update`, { title }),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['categories'] })
      },
    })
  }
  
  export const useDeleteCategory = () => {
    const qc = useQueryClient()
    return useMutation({
      mutationFn: (id) => api.delete(`/categories/${id}`),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['categories'] })
      },
    })
  }
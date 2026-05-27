import { request } from '@/shared/api/http'
import type { ApiResponse, Task } from '@/entities/task/model/types'

export const taskApi = {
  getAll: async () => {
    const response = await request<ApiResponse<Task[]>>('/tasks')
    return response.data
  },
  getById: async (id: number) => {
    const response = await request<ApiResponse<Task>>(`/tasks/${id}`)
    return response.data
  },
  create: async (title: string) => {
    const response = await request<ApiResponse<Task>>('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title }),
    })
    return response.data
  },
  update: async (id: number, payload: Partial<Pick<Task, 'title' | 'completed'>>) => {
    const response = await request<ApiResponse<Task>>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
    return response.data
  },
  toggle: async (id: number) => {
    const response = await request<ApiResponse<Task>>(`/tasks/${id}/toggle`, {
      method: 'PATCH',
    })
    return response.data
  },
  remove: async (id: number) => {
    await request<{ success?: boolean; message?: string; deletedId?: number }>(`/tasks/${id}`, {
      method: 'DELETE',
    })
  },
  deleteCompleted: async () => {
    return request<{ success?: boolean; message?: string; deletedCount: number }>('/tasks/completed', {
      method: 'DELETE',
    })
  },
}

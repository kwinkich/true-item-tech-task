export interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success?: boolean
  data: T
  message?: string
  count?: number
}

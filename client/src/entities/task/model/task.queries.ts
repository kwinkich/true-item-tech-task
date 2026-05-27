import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { taskApi } from '@/entities/task/api/taskApi'
import type { Task } from '@/entities/task/model/types'

const TASKS_QUERY_KEY = ['tasks']

export const useTasksQuery = () => {
  return useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: taskApi.getAll,
  })
}

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (title: string) => taskApi.create(title),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
    },
  })
}

export const useToggleTaskMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => taskApi.toggle(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY_KEY })
      const previous = queryClient.getQueryData<Task[]>(TASKS_QUERY_KEY)

      if (previous) {
        queryClient.setQueryData<Task[]>(
          TASKS_QUERY_KEY,
          previous.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
        )
      }

      return { previous }
    },
    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(TASKS_QUERY_KEY, context.previous)
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
    },
  })
}

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => taskApi.remove(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
    },
  })
}

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<Pick<Task, 'title' | 'completed'>> }) =>
      taskApi.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
    },
  })
}

export const useDeleteCompletedTasksMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => taskApi.deleteCompleted(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
    },
  })
}

import { useTasksQuery } from '@/entities/task/model/task.queries'
import { CreateTaskForm } from '@/features/task/create-task/ui/CreateTaskForm'
import { DeleteCompletedTasksButton } from '@/features/task/delete-completed/ui/DeleteCompletedTasksButton'
import { DeleteTaskButton } from '@/features/task/delete-task/ui/DeleteTaskButton'
import { EditTaskTitleForm } from '@/features/task/edit-task/ui/EditTaskTitleForm'
import { ToggleTaskCheckbox } from '@/features/task/toggle-task/ui/ToggleTaskCheckbox'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { AlertCircle, LoaderCircle } from 'lucide-react'

export const TasksBoard = () => {
  const { data: tasks = [], isLoading, isError, error } = useTasksQuery()
  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>True Item</CardTitle>
          <Badge variant="secondary">
            {completedCount}/{tasks.length} Completed
          </Badge>
        </div>
        <CardDescription>List of tasks involving the backend API</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <CreateTaskForm />
        <DeleteCompletedTasksButton disabled={completedCount === 0} />

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LoaderCircle className="size-4 animate-spin" />
            Загружаем задачи...
          </div>
        )}

        {isError && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="size-4" />
            {(error as Error).message}
          </div>
        )}

        {!isLoading && !isError && (
          <ul className="space-y-2">
            {tasks.length === 0 && <li className="text-sm text-muted-foreground">No tasks yet</li>}

            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <ToggleTaskCheckbox id={task.id} completed={task.completed} />
                  {task.completed ? (
                    <span className="truncate text-muted-foreground line-through">{task.title}</span>
                  ) : (
                    <EditTaskTitleForm id={task.id} title={task.title} />
                  )}
                </div>
                <DeleteTaskButton id={task.id} />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

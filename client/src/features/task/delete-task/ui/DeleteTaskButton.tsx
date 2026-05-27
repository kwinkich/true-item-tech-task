import { Trash2 } from 'lucide-react'
import { useDeleteTaskMutation } from '@/entities/task/model/task.queries'
import { Button } from '@/shared/ui/button'

interface DeleteTaskButtonProps {
  id: number
}

export const DeleteTaskButton = ({ id }: DeleteTaskButtonProps) => {
  const { mutate, isPending } = useDeleteTaskMutation()

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => mutate(id)}
      aria-label="Удалить задачу"
    >
      <Trash2 className="size-4" />
    </Button>
  )
}

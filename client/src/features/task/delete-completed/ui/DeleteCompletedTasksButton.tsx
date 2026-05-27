import { useDeleteCompletedTasksMutation } from '@/entities/task/model/task.queries'
import { Button } from '@/shared/ui/button'

interface DeleteCompletedTasksButtonProps {
  disabled?: boolean
}

export const DeleteCompletedTasksButton = ({ disabled }: DeleteCompletedTasksButtonProps) => {
  const { mutate, isPending } = useDeleteCompletedTasksMutation()

  return (
    <Button variant="outline" disabled={disabled || isPending} onClick={() => mutate()}>
      {isPending ? 'Delete...' : 'Delete completed'}
    </Button>
  )
}

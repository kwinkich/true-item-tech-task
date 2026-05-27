import { useToggleTaskMutation } from '@/entities/task/model/task.queries'
import { Checkbox } from '@/shared/ui/checkbox'

interface ToggleTaskCheckboxProps {
  id: number
  completed: boolean
}

export const ToggleTaskCheckbox = ({ id, completed }: ToggleTaskCheckboxProps) => {
  const { mutate, isPending } = useToggleTaskMutation()

  return <Checkbox checked={completed} disabled={isPending} onCheckedChange={() => mutate(id)} />
}

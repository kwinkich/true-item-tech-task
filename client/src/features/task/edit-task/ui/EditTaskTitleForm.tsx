import { useState } from 'react'
import { Check, Pencil, X } from 'lucide-react'
import { useUpdateTaskMutation } from '@/entities/task/model/task.queries'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

interface EditTaskTitleFormProps {
  id: number
  title: string
}

export const EditTaskTitleForm = ({ id, title }: EditTaskTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(title)
  const { mutateAsync, isPending } = useUpdateTaskMutation()

  const save = async () => {
    const trimmed = draft.trim()
    if (!trimmed || trimmed === title) {
      setDraft(title)
      setIsEditing(false)
      return
    }

    await mutateAsync({ id, payload: { title: trimmed } })
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <span className="truncate">{title}</span>
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} aria-label="Редактировать задачу">
          <Pencil className="size-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <Input value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={200} autoFocus />
      <Button variant="ghost" size="icon" disabled={isPending} onClick={() => void save()} aria-label="Сохранить">
        <Check className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        disabled={isPending}
        onClick={() => {
          setDraft(title)
          setIsEditing(false)
        }}
        aria-label="Отменить"
      >
        <X className="size-4" />
      </Button>
    </div>
  )
}

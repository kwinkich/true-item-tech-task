import { useCreateTaskMutation } from '@/entities/task/model/task.queries'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import type { FormEvent } from 'react'
import { useState } from 'react'

export const CreateTaskForm = () => {
  const [title, setTitle] = useState('')
  const { mutateAsync, isPending } = useCreateTaskMutation()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const trimmed = title.trim()

    if (!trimmed) {
      return
    }

    await mutateAsync(trimmed)
    setTitle('')
  }

  return (
    <form className="flex w-full gap-2" onSubmit={(event) => void handleSubmit(event)}>
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Task Titile..."
        maxLength={200}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Add...' : 'Add'}
      </Button>
    </form>
  )
}

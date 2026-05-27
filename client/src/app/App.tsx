import { QueryProvider } from '@/app/providers/QueryProvider'
import { TasksPage } from '@/pages/tasks-page/ui/TasksPage'

export const App = () => {
  return (
    <QueryProvider>
      <main className="min-h-screen bg-background text-foreground">
        <TasksPage />
      </main>
    </QueryProvider>
  )
}

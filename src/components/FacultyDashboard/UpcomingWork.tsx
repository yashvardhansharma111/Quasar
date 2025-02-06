import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task, Class } from "@/types/dashboard"

interface UpcomingWorkProps {
  tasks: Task[]
  classes: Class[]
}

export function UpcomingWork({ tasks, classes }: UpcomingWorkProps) {
  return (
    <Card className="w-full animate-fade-in hover:shadow-lg transition-shadow">
      <CardHeader className="bg-primary-green text-white rounded-t-lg">
        <CardTitle>Upcoming Work</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Tasks to Review</h3>
            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="p-3 bg-pastel-green rounded-lg hover:bg-light-green transition-colors">
                  <p className="font-medium">{task.taskName}</p>
                  <p className="text-sm text-gray-600">
                    {task.studentName} • {task.course}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Upcoming Classes</h3>
            <div className="space-y-2">
              {classes.slice(0, 3).map((class_) => (
                <div key={class_.id} className="p-3 bg-pastel-green rounded-lg hover:bg-light-green transition-colors">
                  <p className="font-medium">{class_.subject}</p>
                  <p className="text-sm text-gray-800">
                    {class_.date} • {class_.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


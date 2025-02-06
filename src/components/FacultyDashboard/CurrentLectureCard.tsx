
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CurrentLecture } from "@/types/dashboard"

export function CurrentLectureCard({ lecture }: { lecture: CurrentLecture }) {
  return (
    <Card className="w-full animate-fade-in hover:shadow-lg transition-shadow">
      <CardHeader className="bg-primary-green text-white rounded-t-lg">
        <CardTitle>Current Lecture</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold">{lecture.subject}</h3>
            <p className="text-gray-500">
              {lecture.time} • {lecture.duration}
            </p>
          </div>
          <div className="bg-pastel-green p-3 rounded-lg">
            <p className="text-primary-green font-medium">Room: {lecture.room}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


import { Sidebar } from "@/components/FacultyDashboard/Sidebar"
import { CurrentLectureCard } from "@/components/FacultyDashboard/CurrentLectureCard"
import { UpcomingWork } from "@/components/FacultyDashboard/UpcomingWork"

// This would normally come from an API
const mockData = {
  currentLecture: {
    subject: "Advanced Mathematics",
    time: "10:00 AM",
    duration: "1h 30m",
    room: "Room 301",
  },
  tasks: [
    {
      id: "1",
      studentName: "John Doe",
      course: "Mathematics",
      taskName: "Calculus Assignment",
      dueDate: "2024-02-10",
      status: "pending" as "pending",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      course: "Physics",
      taskName: "Lab Report",
      dueDate: "2024-02-11",
      status: "pending" as "pending",
    },
    // Add more tasks as needed
  ],
  classes: [
    {
      id: "1",
      subject: "Physics",
      time: "2:00 PM",
      duration: "1h",
      room: "Lab 201",
      date: "2024-02-06",
    },
    {
      id: "2",
      subject: "Chemistry",
      time: "11:00 AM",
      duration: "1h 30m",
      room: "Lab 102",
      date: "2024-02-07",
    },
    // Add more classes as needed
  ],
  topStudents: [
    {
      id: "1",
      name: "Alice Johnson",
      course: "Mathematics",
      performance: 95,
      rank: 1,
    },
    {
      id: "2",
      name: "Bob Wilson",
      course: "Physics",
      performance: 92,
      rank: 2,
    },
    // Add more students as needed
  ],
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar tasks={mockData.tasks} classes={mockData.classes} topStudents={mockData.topStudents} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <CurrentLectureCard lecture={mockData.currentLecture} />
          <UpcomingWork tasks={mockData.tasks} classes={mockData.classes} />
        </div>
      </main>
    </div>
  )
}


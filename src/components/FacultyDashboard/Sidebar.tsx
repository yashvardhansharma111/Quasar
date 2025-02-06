"use client"

import { Calendar, Star, CheckSquare } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { Task, Class, Student } from "@/types/dashboard"

interface SidebarProps {
  tasks: Task[]
  classes: Class[]
  topStudents: Student[]
}

export function Sidebar({ tasks, classes, topStudents }: SidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("")

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 p-4 flex flex-col animate-slide-in text-black">
      <div className="space-y-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className={cn("w-full justify-start ", activeSection === "tasks" && "bg-pastel-green")}
              onClick={() => setActiveSection("tasks")}
            >
              <CheckSquare className="mr-2 h-4 w-4" />
              Tasks
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Assigned Tasks</SheetTitle>
              <SheetDescription>View and manage tasks assigned to students</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow text-gray-800">
                  <h3 className="font-bold">{task.studentName}</h3>
                  <p className="text-sm text-gray-800">{task.course}</p>
                  <p className="text-sm">{task.taskName}</p>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", activeSection === "classes" && "bg-pastel-green")}
              onClick={() => setActiveSection("classes")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Classes
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Assigned Classes</SheetTitle>
              <SheetDescription>Your upcoming lectures for the next 3 days</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              {classes.map((class_) => (
                <div key={class_.id} className="p-4 text-gray-800 border rounded-lg hover:shadow-md hover:bg-pastel-green transition-shadow">
                  <h3 className=" text-primary-green font-extrabold">{class_.subject}</h3>
                  <p className="text-sm font-bold text-gray-800">
                    {class_.date} at {class_.time}
                  </p>
                  <p className="text-sm font-bold">Duration: {class_.duration}</p>
                  <p className="text-sm font-bold">Room: {class_.room}</p>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>


        <Sheet>
          <SheetTrigger asChild>
          <Button
          variant="ghost"
          className={cn("w-full justify-start", activeSection === "leaderboard" && "bg-pastel-green")}
          onClick={() => setActiveSection("leaderboard")}
        >
          <Star className="mr-2 h-4 w-4" />
          Star Performers
        </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Star Performers</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              {topStudents.map((class_) => (
                <div key={class_.id} className="p-4 text-gray-800 border rounded-lg hover:shadow-md hover:bg-pastel-green transition-shadow">
                  <h2 className=" text-primary-green font-extrabold">{class_.name}</h2>
                  <p className="text-sm  font-bold">Course : {class_.course}</p>
                  <p className="text-sm font-bold text-gray-800">
                    Performace : {class_.performance}
                  </p>
                  <p className="text-sm font-bold">Rank : {class_.rank}</p>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

       
      </div>
    </div>
  )
}


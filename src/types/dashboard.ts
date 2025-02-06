export interface Task {
    id: string
    studentName: string
    course: string
    taskName: string
    dueDate: string
    status: "pending" | "completed"
  }
  
  export interface Class {
    id: string
    subject: string
    time: string
    duration: string
    room: string
    date: string
  }
  
  export interface Student {
    id: string
    name: string
    course: string
    performance: number
    rank: number
  }
  
  export interface CurrentLecture {
    subject: string
    time: string
    duration: string
    room: string
  }
  
  
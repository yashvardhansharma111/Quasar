"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../../components/Navigation'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

export default function MentorDashboard() {
  const [mentees, setMentees] = useState([
    { id: 1, name: 'Alice Johnson', progress: 75, tasksCompleted: 15, tasksTotal: 20 },
    { id: 2, name: 'Bob Smith', progress: 60, tasksCompleted: 12, tasksTotal: 20 },
    { id: 3, name: 'Charlie Brown', progress: 90, tasksCompleted: 18, tasksTotal: 20 },
  ])

  const [tasks, setTasks] = useState([
    { id: 1, menteeId: 1, title: 'Implement a Binary Search Tree', status: 'In Progress', feedback: '' },
    { id: 2, menteeId: 2, title: 'Create a RESTful API', status: 'Submitted', feedback: '' },
    { id: 3, menteeId: 3, title: 'Develop a React Component', status: 'Completed', feedback: 'Great job!' },
  ])

  const [newTask, setNewTask] = useState({ menteeId: '', title: '', description: '' })
  const [selectedTask, setSelectedTask] = useState(null)
  const [feedback, setFeedback] = useState('')

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    const newTaskId = tasks.length + 1
    setTasks([...tasks, { id: newTaskId, menteeId: parseInt(newTask.menteeId), title: newTask.title, status: 'Assigned', feedback: '' }])
    setNewTask({ menteeId: '', title: '', description: '' })
  }

  const handleProvideFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedTask) {
      setTasks(tasks.map(task => 
        task.id === selectedTask.id ? { ...task, feedback, status: 'Completed' } : task
      ))
      setSelectedTask(null)
      setFeedback('')
    }
  }

  const pieChartData = mentees.map(mentee => ({
    name: mentee.name,
    value: mentee.progress
  }))

  const barChartData = mentees.map(mentee => ({
    name: mentee.name,
    completed: mentee.tasksCompleted,
    remaining: mentee.tasksTotal - mentee.tasksCompleted
  }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Mentor Dashboard
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Mentees Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Tasks Completion</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="#0088FE" />
                <Bar dataKey="remaining" stackId="a" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-secondary p-6 rounded-lg md:col-span-2"
          >
            <h2 className="text-2xl font-semibold mb-4">Assign New Task</h2>
            <form onSubmit={handleAddTask} className="space-y-4">
              <select
                value={newTask.menteeId}
                onChange={(e) => setNewTask({ ...newTask, menteeId: e.target.value })}
                className="w-full px-4 py-2 rounded bg-accent text-white"
                required
              >
                <option value="">Select Mentee</option>
                {mentees.map(mentee => (
                  <option key={mentee.id} value={mentee.id}>{mentee.name}</option>
                ))}
              </select>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Task Title"
                className="w-full px-4 py-2 rounded bg-accent text-white"
                required
              />
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Task Description"
                className="w-full px-4 py-2 rounded bg-accent text-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded"
              >
                Assign Task
              </button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-secondary p-6 rounded-lg md:col-span-2"
          >
            <h2 className="text-2xl font-semibold mb-4">Task Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Mentee</th>
                    <th className="text-left">Task</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id}>
                      <td>{mentees.find(m => m.id === task.menteeId)?.name}</td>
                      <td>{task.title}</td>
                      <td>{task.status}</td>
                      <td>
                        {task.status === 'Submitted' && (
                          <button
                            onClick={() => setSelectedTask(task)}
                            className="bg-primary text-primary-foreground px-2 py-1 rounded"
                          >
                            Review
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          {selectedTask && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-secondary p-6 rounded-lg md:col-span-2"
            >
              <h2 className="text-2xl font-semibold mb-4">Provide Feedback</h2>
              <form onSubmit={handleProvideFeedback} className="space-y-4">
                <p>Task: {selectedTask.title}</p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Your feedback"
                  className="w-full px-4 py-2 rounded bg-accent text-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white px-4 py-2 rounded"
                >
                  Submit Feedback
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}


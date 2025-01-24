"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navigation from '../../../components/Navigation'

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState({
    name: 'John Doe',
    rank: 42,
    progress: {
      academic: 75,
      practical: 60,
      innovation: 80,
    },
    tasks: [
      { id: 1, title: 'Implement a Binary Search Tree', status: 'In Progress', description: 'Create a BST implementation in Python', feedback: '' },
      { id: 2, title: 'Create a RESTful API', status: 'Pending', description: 'Develop a simple RESTful API using Node.js and Express', feedback: '' },
    ],
    opportunities: [
      { id: 1, title: 'Summer Internship at Tech Co', type: 'Internship' },
      { id: 2, title: 'Global Hackathon 2023', type: 'Hackathon' },
    ],
  })

  const [selectedTask, setSelectedTask] = useState<number | null>(null)
  const [submission, setSubmission] = useState({ link: '', comments: '' })

  const handleSubmitTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedTask !== null) {
      setStudentData(prev => ({
        ...prev,
        tasks: prev.tasks.map(task => 
          task.id === selectedTask ? { ...task, status: 'Submitted' } : task
        ),
        progress: {
          ...prev.progress,
          practical: Math.min(100, prev.progress.practical + 5) // Increase practical progress
        }
      }))
      setSelectedTask(null)
      setSubmission({ link: '', comments: '' })
    }
  }

  const calculateOverallProgress = () => {
    const { academic, practical, innovation } = studentData.progress
    return Math.round((academic + practical + innovation) / 3)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Welcome, {studentData.name}
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Progress Tracker</h2>
            {Object.entries(studentData.progress).map(([key, value]) => (
              <div key={key} className="mb-4">
                <p className="capitalize">{key}</p>
                <motion.div
                  className="bg-accent h-4 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${value}%` }}
                  ></div>
                </motion.div>
              </div>
            ))}
            <div className="mt-4">
              <p>Overall Progress</p>
              <motion.div
                className="bg-accent h-4 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${calculateOverallProgress()}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div
                  className="bg-primary h-full"
                  style={{ width: `${calculateOverallProgress()}%` }}
                ></div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Leaderboard Rank</h2>
            <p className="text-6xl font-bold text-primary">{studentData.rank}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-secondary p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
            <ul className="space-y-2 mb-4">
              {studentData.tasks.map((task) => (
                <li key={task.id} className="flex justify-between items-center">
                  <span>{task.title}</span>
                  <span className="text-sm text-primary">{task.status}</span>
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmitTask} className="space-y-4">
              <select
                value={selectedTask || ''}
                onChange={(e) => setSelectedTask(Number(e.target.value))}
                className="w-full px-4 py-2 rounded bg-accent text-white"
                required
              >
                <option value="">Select Task to Submit</option>
                {studentData.tasks.filter(task => task.status !== 'Submitted').map(task => (
                  <option key={task.id} value={task.id}>{task.title}</option>
                ))}
              </select>
              <input
                type="text"
                value={submission.link}
                onChange={(e) => setSubmission({ ...submission, link: e.target.value })}
                placeholder="Submission Link"
                className="w-full px-4 py-2 rounded bg-accent text-white"
                required
              />
              <textarea
                value={submission.comments}
                onChange={(e) => setSubmission({ ...submission, comments: e.target.value })}
                placeholder="Additional Comments"
                className="w-full px-4 py-2 rounded bg-accent text-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded"
              >
                Submit Task
              </button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-secondary p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Opportunities</h2>
            <ul className="space-y-2">
              {studentData.opportunities.map((opportunity) => (
                <li key={opportunity.id} className="flex justify-between items-center">
                  <span>{opportunity.title}</span>
                  <span className="text-sm text-primary">{opportunity.type}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  )
}


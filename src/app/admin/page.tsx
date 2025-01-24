"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navigation from '../../components/Navigation'

const initialUsers = [
  { id: 1, name: 'John Doe', role: 'Student', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', role: 'Mentor', email: 'jane@example.com' },
  { id: 3, name: 'Tech University', role: 'University', email: 'tech@university.com' },
  { id: 4, name: 'Innovate Corp', role: 'Company', email: 'info@innovate.com' },
]

export default function AdminPanel() {
  const [users, setUsers] = useState(initialUsers)
  const [newUser, setNewUser] = useState({ name: '', role: 'Student', email: '' })

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    setUsers([...users, { ...newUser, id: Date.now() }])
    setNewUser({ name: '', role: 'Student', email: '' })
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Admin Panel
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            <ul className="space-y-2">
              {users.map((user) => (
                <li key={user.id} className="flex justify-between items-center">
                  <span>{user.name} ({user.role})</span>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Name"
                className="w-full px-4 py-2 rounded bg-accent text-white"
                required
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-4 py-2 rounded bg-accent text-white"
              >
                <option value="Student">Student</option>
                <option value="Mentor">Mentor</option>
                <option value="University">University</option>
                <option value="Company">Company</option>
              </select>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Email"
                className="w-full px-4 py-2 rounded bg-accent text-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-2 rounded"
              >
                Add User
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  )
}


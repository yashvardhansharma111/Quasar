"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../../components/Navigation'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function CompanyDashboard() {
  const [opportunities, setOpportunities] = useState([
    { id: 1, title: 'Summer Internship Program', type: 'Internship', applicants: 50 },
    { id: 2, title: 'AI Research Project', type: 'Research', applicants: 30 },
    { id: 3, title: 'Web Development Hackathon', type: 'Hackathon', applicants: 100 },
  ])

  const [newOpportunity, setNewOpportunity] = useState({ title: '', type: 'Internship' })

  const handleAddOpportunity = (e: React.FormEvent) => {
    e.preventDefault()
    setOpportunities([...opportunities, { ...newOpportunity, id: Date.now(), applicants: 0 }])
    setNewOpportunity({ title: '', type: 'Internship' })
  }

  const chartData = opportunities.map(opp => ({
    name: opp.title,
    applicants: opp.applicants
  }))

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Company Dashboard
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Opportunities Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applicants" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Add New Opportunity</h2>
            <form onSubmit={handleAddOpportunity} className="space-y-4">
              <input
                type="text"
                value={newOpportunity.title}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
                placeholder="Opportunity Title"
                className="w-full px-4 py-2 rounded bg-accent text-white"
                required
              />
              <select
                value={newOpportunity.type}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, type: e.target.value })}
                className="w-full px-4 py-2 rounded bg-accent text-white"
              >
                <option value="Internship">Internship</option>
                <option value="Research">Research</option>
                <option value="Hackathon">Hackathon</option>
              </select>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded"
              >
                Add Opportunity
              </button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-secondary p-6 rounded-lg md:col-span-2"
          >
            <h2 className="text-2xl font-semibold mb-4">Current Opportunities</h2>
            <ul className="space-y-2">
              {opportunities.map((opportunity) => (
                <li key={opportunity.id} className="flex justify-between items-center">
                  <span>{opportunity.title}</span>
                  <span className="text-sm text-primary">{opportunity.type} - {opportunity.applicants} applicants</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  )
}


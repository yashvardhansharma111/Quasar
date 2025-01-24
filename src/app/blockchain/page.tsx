"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navigation from '../../components/Navigation'

const initialBlockchainRecords = [
  { id: 1, type: 'Certification', title: 'Advanced Web Development', date: '2023-05-15' },
  { id: 2, type: 'Evaluation', title: 'AI Project Assessment', date: '2023-06-01' },
  { id: 3, type: 'Contract', title: 'Internship Agreement', date: '2023-06-15' },
]

export default function BlockchainDashboard() {
  const [blockchainRecords, setBlockchainRecords] = useState(initialBlockchainRecords)
  const [votes, setVotes] = useState({ yes: 0, no: 0 })

  const handleVote = (vote: 'yes' | 'no') => {
    setVotes(prev => ({ ...prev, [vote]: prev[vote] + 1 }))
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
          Blockchain Dashboard
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Blockchain Records</h2>
            <ul className="space-y-4">
              {blockchainRecords.map((record) => (
                <motion.li
                  key={record.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * record.id }}
                  className="bg-accent p-4 rounded"
                >
                  <h3 className="text-lg font-semibold">{record.title}</h3>
                  <p className="text-sm text-primary">{record.type}</p>
                  <p className="text-sm">{record.date}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Governance Voting</h2>
            <div className="space-y-4">
              <div className="bg-accent p-4 rounded">
                <h3 className="text-lg font-semibold">Current Proposal</h3>
                <p className="mb-2">Implement new skill verification process</p>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleVote('yes')}
                  >
                    Vote Yes ({votes.yes})
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleVote('no')}
                  >
                    Vote No ({votes.no})
                  </motion.button>
                </div>
              </div>
              <div className="bg-accent p-4 rounded">
                <h3 className="text-lg font-semibold">Voting Results</h3>
                <div className="mt-2 h-4 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(votes.yes / (votes.yes + votes.no)) * 100 || 0}%` }}
                  ></div>
                </div>
                <p className="mt-2">Yes: {((votes.yes / (votes.yes + votes.no)) * 100 || 0).toFixed(2)}%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}


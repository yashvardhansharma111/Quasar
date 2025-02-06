"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navigation from '../../components/Navigation'

const initialLeaderboardData = [
  { rank: 1, name: 'Alice Johnson', university: 'Tech University', points: 1500 },
  { rank: 2, name: 'Bob Smith', university: 'Innovation College', points: 1450 },
  { rank: 3, name: 'Charlie Brown', university: 'Future Institute', points: 1400 },
  { rank: 4, name: 'Diana Lee', university: 'Global Academy', points: 1350 },
  { rank: 5, name: 'Ethan Davis', university: 'Cyber University', points: 1300 },
]

const initialCompetitions = [
  { id: 1, title: 'Global Hackathon 2023', category: 'Hackathon', date: '2023-08-15' },
  { id: 2, title: 'AI Innovation Challenge', category: 'Innovation', date: '2023-09-01' },
  { id: 3, title: 'Blockchain Development Contest', category: 'R&D', date: '2023-09-15' },
]

export default function CompetitionHub() {
  const [leaderboardData, setLeaderboardData] = useState(initialLeaderboardData)
  const [competitions, setCompetitions] = useState(initialCompetitions)
  const [filter, setFilter] = useState('All')

  const filteredCompetitions = filter === 'All' 
    ? competitions 
    : competitions.filter(comp => comp.category === filter)

  return (
    <div className="min-h-screen  ">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Competition Hub
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary text-black p-6 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4 underline">Global Leaderboard</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Rank</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">University</th>
                  <th className="text-left">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry) => (
                  <motion.tr
                    key={entry.rank}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * entry.rank }}
                  >
                    <td>{entry.rank}</td>
                    <td>{entry.name}</td>
                    <td>{entry.university}</td>
                    <td>{entry.points}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary text-black p-6 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4 underline text-black">Upcoming Competitions</h2>
            <div className="mb-4">
              <label htmlFor="filter" className="mr-2">Filter by:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-black text-white p-2 rounded"
              >
                <option value="All">All</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Innovation">Innovation</option>
                <option value="R&D">R&D</option>
              </select>
            </div>
            <ul className="space-y-4">
              {filteredCompetitions.map((competition) => (
                <motion.li
                  key={competition.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * competition.id }}
                  className="bg-accent p-4 rounded"
                >
                  <h3 className="text-lg font-semibold">{competition.title}</h3>
                  <p className="text-sm text-primary">{competition.category}</p>
                  <p className="text-sm">{competition.date}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  )
}


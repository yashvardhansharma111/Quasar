"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'

const userTypes = ['Student', 'Mentor', 'University', 'Company']

export default function SignUp() {
  const [userType, setUserType] = useState('Student')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skills: '',
    expertise: '',
    organizationDetails: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { userType, ...formData })
    // Here you would typically send the data to your backend
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
          <div className="mb-6 flex justify-center space-x-4">
            {userTypes.map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full ${
                  userType === type ? 'bg-primary text-white' : 'bg-secondary text-white'
                }`}
                onClick={() => setUserType(type)}
              >
                {type}
              </motion.button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded bg-secondary text-white"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded bg-secondary text-white"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded bg-secondary text-white"
              required
            />
            {userType === 'Student' && (
              <input
                type="text"
                name="skills"
                placeholder="Skills (comma separated)"
                value={formData.skills}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded bg-secondary text-white"
              />
            )}
            {userType === 'Mentor' && (
              <input
                type="text"
                name="expertise"
                placeholder="Expertise"
                value={formData.expertise}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded bg-secondary text-white"
              />
            )}
            {(userType === 'University' || userType === 'Company') && (
              <input
                type="text"
                name="organizationDetails"
                placeholder="Organization Details"
                value={formData.organizationDetails}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded bg-secondary text-white"
              />
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-primary text-white px-6 py-3 rounded-full font-semibold"
              type="submit"
            >
              Sign Up
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  )
}


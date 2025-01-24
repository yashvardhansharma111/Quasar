"use client"

import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center relative"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bridging Academia and Industry through Blockchain
          </h1>
          <p className="text-xl mb-8">
            Connect, learn, and grow with SkillBridge
          </p>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold"
            >
              <Link href="/signup">Sign Up</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-semibold"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {['Students', 'Mentors', 'Universities', 'Companies'].map((userType, index) => (
            <motion.div
              key={userType}
              className="bg-secondary p-6 rounded-lg"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <h2 className="text-2xl font-semibold mb-4">{userType}</h2>
              <ul className="list-disc list-inside">
                <li>Personalized learning paths</li>
                <li>Industry connections</li>
                <li>Blockchain-verified achievements</li>
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">1. Sign Up</h3>
              <p>Create your account as a student, mentor, university, or company.</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">2. Connect</h3>
              <p>Find mentors, join projects, or offer opportunities.</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">3. Grow</h3>
              <p>Complete tasks, earn certifications, and build your portfolio.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg"
          >
            <Link href="/signup">Join SkillBridge Today</Link>
          </motion.button>
        </motion.div>
      </main>

      <footer className="bg-secondary mt-16 py-8 text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">SkillBridge</h3>
              <p>Bridging Academia and Industry through Blockchain</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 SkillBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


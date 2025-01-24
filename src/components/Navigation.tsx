"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Notifications from './Notification'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Competition Hub', href: '/competition-hub' },
  { name: 'Blockchain', href: '/blockchain' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-secondary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          SkillBridge
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href={item.href} 
                className={`text-white hover:text-primary ${
                  pathname === item.href ? 'border-b-2 border-primary' : ''
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <Notifications />
        </div>
        <div className="md:hidden flex items-center">
          <Notifications />
          <button onClick={() => setIsOpen(!isOpen)} className="text-white ml-4">
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block py-2 px-4 text-white hover:bg-primary ${
                pathname === item.href ? 'bg-primary' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  )
}


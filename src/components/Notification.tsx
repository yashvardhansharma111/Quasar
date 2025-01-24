"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell } from 'lucide-react'

interface Notification {
  id: number
  message: string
  read: boolean
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    // Simulating fetching notifications from an API
    const fetchedNotifications = [
      { id: 1, message: "New task assigned: Implement a Binary Search Tree", read: false },
      { id: 2, message: "Your submission for 'Create a RESTful API' has been reviewed", read: false },
      { id: 3, message: "New opportunity: Summer Internship at Tech Co", read: true },
    ]
    setNotifications(fetchedNotifications)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-foreground hover:bg-secondary rounded-full"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-secondary rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Notifications</h3>
              <ul className="space-y-2">
                {notifications.map(notification => (
                  <li
                    key={notification.id}
                    className={`p-2 rounded ${notification.read ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    {notification.message}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


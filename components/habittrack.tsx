'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Button } from "@/components/ui/button"

interface Habit {
  name: string
}

interface HabitTrackingProps {
  habit: Habit
  progress: Record<string, boolean>
  onProgressUpdate: (date: string, completed: boolean) => void
  onReset: () => void
}

const motivationalQuotes = [
  "Small steps lead to big changes—you're building something amazing!",
  "Every day you show up, you're getting stronger. Keep going!",
  "Progress is progress, no matter how small. Be proud of today!",
  "Consistency is key, and you're unlocking it every day!",
  "You're investing in yourself—this habit is just the beginning!",
  "Your commitment today brings a brighter tomorrow!",
  "One day at a time; you're making a difference in your life!",
  "You're doing something wonderful for your mind and soul. Keep it up!",
  "Every click counts; keep moving forward with confidence!",
  "You chose to show up today—let's celebrate that!"
]

const ConfettiButton = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
  const handleClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
    onClick()
  }

  return (
    <Button 
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
    >
      {children}
    </Button>
  )
}

export default function HabitTracking({
  habit,
  progress,
  onProgressUpdate,
  onReset,
}: HabitTrackingProps) {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
  const [quote, setQuote] = useState('')
  const [showQuote, setShowQuote] = useState(false)

  const handleToggle = () => {
    onProgressUpdate(currentDate, !progress[currentDate])
    if (!progress[currentDate]) {
      setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])
      setShowQuote(true)
      setTimeout(() => setShowQuote(false), 5000) // Hide quote after 5 seconds
    }
  }

  useEffect(() => {
    setShowQuote(false)
  }, [currentDate])

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{habit.name}</h2>
      <div className="w-full">
        <input
          type="date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
          className="w-full p-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
      </div>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ConfettiButton onClick={handleToggle}>
          {progress[currentDate] ? 'Completed 🎉' : 'Mark as Complete'}
        </ConfettiButton>
      </motion.div>
      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            {quote}
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        variant="outline"
        className="mt-8 transition-colors duration-300"
        onClick={onReset}
      >
        Change Habit
      </Button>
    </div>
  )
}
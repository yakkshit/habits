'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'

interface Habit {
  id: string;
  name: string;
  color: string;
}

interface CustomHabitInputProps {
  onAddHabit: (habit: Habit) => void;
}

const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360)
  const saturation = Math.floor(Math.random() * 30) + 70 // 70-100%
  const lightness = Math.floor(Math.random() * 20) + 40 // 40-60%
  return `bg-[hsl(${hue},${saturation}%,${lightness}%)]`
}

export default function CustomHabitInput({ onAddHabit }: CustomHabitInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [habitName, setHabitName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (habitName.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: habitName.trim(),
        color: generateRandomColor(),
      }
      onAddHabit(newHabit)
      setHabitName('')
      setIsOpen(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <AnimatePresence>
        {isOpen && (
          <motion.form
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-16 flex flex-col gap-2"
          >
            <input
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="Enter custom habit"
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              autoFocus
            />
            <motion.button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Habit
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'bg-red-500' : 'bg-blue-500'
        } text-white p-4 rounded-full shadow-lg`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close add habit form' : 'Open add habit form'}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </motion.button>
    </div>
  )
}
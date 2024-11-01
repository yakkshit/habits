'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Background from '@/components/backgrouns';
import ThemeToggle from '@/components/themetoggle';
import HabitSelection from '@/components/habitselection';
import CustomHabitInput from '@/components/customhabits';
import HabitTracking from '@/components/habittrack';
import Link from 'next/link';

interface Habit {
  id: string;
  name: string;
  color: string;
}

const initialHabits: Habit[] = [
  { id: 'exercise', name: 'Exercise', color: 'bg-blue-500' },
  { id: 'mindfulness', name: 'Mindfulness', color: 'bg-green-500' },
  { id: 'sleep', name: 'Sleep', color: 'bg-purple-500' },
  { id: 'reading', name: 'Reading', color: 'bg-yellow-500' },
  { id: 'hydration', name: 'Hydration', color: 'bg-cyan-500' },
]

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits)
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null)
  const [progress, setProgress] = useState<Record<string, Record<string, boolean>>>({})
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem('habits') || JSON.stringify(initialHabits))
    const storedHabit = localStorage.getItem('selectedHabit')
    const storedProgress = JSON.parse(localStorage.getItem('habitProgress') || '{}')
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark'
    
    setHabits(storedHabits)
    if (storedHabit) setSelectedHabit(storedHabits.find((h: Habit) => h.id === storedHabit) || null)
    setProgress(storedProgress)
    setTheme(storedTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    if (selectedHabit) {
      localStorage.setItem('selectedHabit', selectedHabit.id)
    }
  }, [selectedHabit])

  useEffect(() => {
    localStorage.setItem('habitProgress', JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleHabitSelect = (habit: Habit) => {
    setSelectedHabit(habit)
  }

  const handleProgressUpdate = (date: string, completed: boolean) => {
    if (selectedHabit) {
      setProgress(prev => ({
        ...prev,
        [selectedHabit.id]: {
          ...prev[selectedHabit.id],
          [date]: completed,
        },
      }))
    }
  }

  const handleAddCustomHabit = (newHabit: Habit) => {
    setHabits(prevHabits => [...prevHabits, newHabit])
  }

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Background selectedHabit={selectedHabit} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href='/'>
            <h1 className="text-4xl font-bold">Daily Habit Tracker</h1>
          </Link>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <AnimatePresence mode="wait">
          {!selectedHabit ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <HabitSelection habits={habits} onSelect={handleHabitSelect} />
              <CustomHabitInput onAddHabit={handleAddCustomHabit} />
            </motion.div>
          ) : (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <HabitTracking
                habit={selectedHabit}
                progress={progress[selectedHabit.id] || {}}
                onProgressUpdate={handleProgressUpdate}
                onReset={() => setSelectedHabit(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
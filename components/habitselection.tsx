import { motion } from 'framer-motion'

interface Habit {
  id: string;
  name: string;
  color: string;
}

interface HabitSelectionProps {
  habits: Habit[];
  onSelect: (habit: Habit) => void;
}

export default function HabitSelection({ habits, onSelect }: HabitSelectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {habits.map((habit) => (
        <motion.button
          key={habit.id}
          className={`p-6 rounded-lg shadow-md ${habit.color} text-white font-semibold text-lg transition-transform duration-300 hover:scale-105`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(habit)}
        >
          {habit.name}
        </motion.button>
      ))}
    </div>
  )
}
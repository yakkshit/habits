import { motion } from 'framer-motion'

interface Habit {
  id: string;
  name: string;
  color: string;
}

interface BackgroundProps {
  selectedHabit: Habit | null;
}

export default function Background({ selectedHabit }: BackgroundProps) {
  return (
    <motion.div
      className="fixed inset-0 -z-10 border-white dark:border-black"
      animate={{
        backgroundColor: selectedHabit 
          ? selectedHabit.color.startsWith('bg-[') 
            ? selectedHabit.color.slice(4, -1) 
            : selectedHabit.color.replace('bg-', '').replace('-500', '')
          : 'transparent',
      }}
      transition={{ duration: 0.5 }}
    />
  )
}
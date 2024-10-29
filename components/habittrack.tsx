import { useState } from 'react';
import { motion } from 'framer-motion';

// Define interfaces for the props
interface Habit {
    name: string;
}

interface HabitTrackingProps {
    habit: Habit;
    progress: Record<string, boolean>; // or { [date: string]: boolean } for a more explicit type
    onProgressUpdate: (date: string, completed: boolean) => void;
    onReset: () => void;
}

export default function HabitTracking({
    habit,
    progress,
    onProgressUpdate,
    onReset,
}: HabitTrackingProps) {
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

    const handleToggle = () => {
        onProgressUpdate(currentDate, !progress[currentDate]);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">{habit.name}</h2>
            <div className="mb-4">
                <input
                    type="date"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    className="p-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800"
                />
            </div>
            <motion.button
                className={`p-4 rounded-full w-32 h-32 text-white font-bold text-xl ${
                    progress[currentDate] ? 'bg-green-500' : 'bg-gray-400'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggle}
            >
                {progress[currentDate] ? 'Completed' : 'Mark Done'}
            </motion.button>
            <button
                className="mt-8 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                onClick={onReset}
            >
                Change Habit
            </button>
        </div>
    );
}

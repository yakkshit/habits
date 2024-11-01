"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'


export default function Home() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])


  const features = [
    { icon: '🎯', title: 'Set Goals', description: 'Define and track your daily habits' },
    { icon: '📊', title: 'Visualize Progress', description: 'See your improvements over time' },
    { icon: '🏆', title: 'Stay Motivated', description: 'Receive encouragement and rewards' },
    { icon: '🔄', title: 'Build Consistency', description: 'Develop long-lasting positive habits' },
  ]

  const testimonials = [
    { name: 'Sarah K.', text: 'This app has completely transformed my daily routine!' },
    { name: 'Mike R.', text: 'I`ve never been so consistent with my habits. Highly recommended!' },
    { name: 'Emily L.', text: 'The interface is intuitive and the animations make it fun to use.' },
  ]

  

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <motion.main style={{ opacity, scale }} className="pt-20 smooth-scroll">
        <section className="hero min-h-screen flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Transform Your Life, One Habit at a Time
            </motion.h2>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Build lasting habits and achieve your goals with our intuitive habit tracking app.
            </motion.p>
            <Link href='/habits'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-200"
            >
              Get Started
            </motion.button>
            </Link>
          </div>
        </section>

        <section className="features py-20 bg-gray-200 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="benefits py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Why Use Our Habit Tracker?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/vercel.svg"
                  height={400}
                  width={400}
                  alt="Habit tracking illustration"
                  className="rounded-lg shadow-md"
                />
              </motion.div>
              <motion.ul
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {[
                  'Increase productivity and focus',
                  'Achieve personal and professional goals',
                  'Improve overall well-being',
                  'Track progress and celebrate milestones',
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </section>

        <section className="testimonials py-20 bg-gray-200 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Our Motivational Quotes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                >
                  <p className="mb-4 italic">&quot;{testimonial.text}&quot;</p>
                  {/* <p className="font-semibold">- {testimonial.name}</p> */}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta py-20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Habits?</h3>
            <Link href='/habits'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-200"
            >
              Start Your Journey Now
            </motion.button>
            </Link>
          </div>
        </section>
      </motion.main>

      <footer className="py-8">
        <div className="container mx-auto px-4 text-center">
          <p>Designed by cedzlabs</p>
        </div>
      </footer>
    </div>
  )
}
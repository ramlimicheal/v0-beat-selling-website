'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, ArrowRight, BarChart3, Users, Zap } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function SellBeatsPage() {
  const [isDragging, setIsDragging] = useState(false)

  const stats = [
    { icon: Users, label: 'Active Buyers', value: '500K+' },
    { icon: BarChart3, label: 'Beats Sold', value: '2.5M+' },
    { icon: Zap, label: 'Avg Commission', value: '50%' }
  ]

  const steps = [
    { number: 1, title: 'Create Account', description: 'Sign up and verify your producer identity' },
    { number: 2, title: 'Upload Beats', description: 'Upload your tracks with metadata and licenses' },
    { number: 3, title: 'Set Prices', description: 'Define exclusive and lease prices' },
    { number: 4, title: 'Start Earning', description: 'Get paid automatically when beats sell' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] to-[#0a0a0a]">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">Start Selling Your Beats</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Join thousands of producers earning money from their music on the world's leading beat marketplace.</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-b from-purple-900/10 to-blue-900/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 text-center"
              >
                <div className="flex justify-center mb-4">
                  <Icon size={32} className="text-blue-400" />
                </div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Upload section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              isDragging
                ? 'border-blue-500 bg-blue-500/5'
                : 'border-purple-500/30 bg-purple-500/5'
            }`}
          >
            <motion.div
              animate={{ y: isDragging ? -5 : 0 }}
              className="flex justify-center mb-4"
            >
              <Upload size={48} className="text-blue-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Upload Your Beats</h3>
            <p className="text-gray-400 mb-6">Drag and drop your MP3 files here or click to browse</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold"
            >
              Choose Files
            </motion.button>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent"></div>

            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-b from-purple-900/10 to-blue-900/10 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto"
                  >
                    {step.number}
                  </motion.div>
                  <h3 className="text-white font-semibold mb-2 text-center">{step.title}</h3>
                  <p className="text-gray-400 text-sm text-center">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold inline-flex items-center gap-2 text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all"
          >
            Get Started Now <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

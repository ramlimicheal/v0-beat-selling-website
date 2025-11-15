'use client'

import { motion } from 'framer-motion'
import { CheckCircle, BarChart3, Users } from 'lucide-react'

export default function ProducerTools() {
  const features = [
    {
      icon: CheckCircle,
      title: 'Unlimited Uploads',
      description: 'Upload as many beats as you want and reach millions of potential buyers',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track sales, plays, and earnings with detailed performance insights',
    },
    {
      icon: Users,
      title: 'Direct Messaging',
      description: 'Connect directly with buyers and collaborate on custom productions',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Kickstart Your Music Career Today
            </h2>
            <p className="text-lg text-[#B0B0B0] mb-8">
              Whether you're just starting out or already established, BeatStars gives you the tools to succeed as a music producer and entrepreneur.
            </p>

            <div className="space-y-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#2F80ED]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-[#B0B0B0]">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 gradient-primary text-white rounded-lg hover:gradient-hover transition font-medium"
            >
              Start Selling Beats
            </motion.button>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-[#2F80ED]/20 to-[#6E33FF]/20 rounded-2xl p-8 border border-[#2A2A2A] overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Producer tools"
                className="w-full rounded-xl"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#6E33FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

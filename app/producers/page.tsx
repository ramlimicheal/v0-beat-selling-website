'use client'

import { motion } from 'framer-motion'
import { Music, Headphones, Palette, TrendingUp } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function ProducersPage() {
  const features = [
    {
      icon: Music,
      title: 'Studio Quality',
      description: 'Upload high-fidelity beats with professional mastering.'
    },
    {
      icon: Headphones,
      title: 'Exclusive Leasing',
      description: 'Control licensing terms and protect your intellectual property.'
    },
    {
      icon: Palette,
      title: 'Creative Freedom',
      description: 'Set your own prices and retain creative control.'
    },
    {
      icon: TrendingUp,
      title: 'Sales Analytics',
      description: 'Track performance and optimize your catalog.'
    }
  ]

  const testimonials = [
    {
      name: 'Alex Rivera',
      title: 'Independent Producer',
      quote: 'BeatStars doubled my monthly income within 3 months.',
      image: '/producer-1.jpg'
    },
    {
      name: 'Jordan Smith',
      title: 'Studio Owner',
      quote: 'The best platform for connecting with artists looking for quality beats.',
      image: '/producer-2.jpg'
    },
    {
      name: 'Casey Chen',
      title: 'Music Producer',
      quote: 'Easy to use, great payouts, and amazing community support.',
      image: '/producer-3.jpg'
    }
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
          <h1 className="text-5xl font-bold text-white mb-6">Tools for Producers</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Everything you need to create, manage, and monetize your music.</p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-b from-purple-900/10 to-blue-900/10 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4"
                >
                  <Icon size={32} className="text-blue-400" />
                </motion.div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What Producers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-b from-purple-900/10 to-blue-900/10 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all"
          >
            Start Earning Today
          </motion.button>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

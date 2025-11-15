'use client'

import { useState } from 'react'
import { Search, Play } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeroProps {
  onSearch: (query: string) => void
}

function ParticleBackground() {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            opacity: 0,
          }}
          animate={{
            x: [`${particle.x}%`, `${(particle.x + 30) % 100}%`, `${particle.x}%`],
            y: [`${particle.y}%`, `${(particle.y - 40) % 100}%`, `${particle.y}%`],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute rounded-full bg-[#2F80ED]"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: `0 0 ${particle.size * 2}px #2F80ED`,
          }}
        />
      ))}

      {/* Particle connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2F80ED" />
            <stop offset="100%" stopColor="#6E33FF" />
          </linearGradient>
        </defs>
        {particles.slice(0, 10).map((p, i) => {
          const nextP = particles[(i + 1) % 10]
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${p.x}%`}
              y1={`${p.y}%`}
              x2={`${nextP.x}%`}
              y2={`${nextP.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="0.5"
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}

function AudioVisualizer() {
  const bars = Array.from({ length: 12 })

  return (
    <div className="flex items-end justify-center gap-1 h-12">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: [8, 32, 8, 24, 16, 28, 12] }}
          transition={{
            duration: 1.2,
            delay: i * 0.05,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-1 rounded-full bg-gradient-to-t from-[#2F80ED] to-[#6E33FF]"
        />
      ))}
    </div>
  )
}

function AnimatedText({ children }: { children: string }) {
  const words = children.split(' ')

  return (
    <div className="inline">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="inline-block mr-3"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchInput, setSearchInput] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchInput)
  }

  return (
    <div className="relative pt-20 pb-32 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-[#2F80ED] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{
            duration: 20,
            delay: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-10 right-10 w-72 h-72 bg-[#6E33FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#27AE60] rounded-full mix-blend-multiply filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Particle network background */}
      <ParticleBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main headline with staggered reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <AnimatedText>Your First Hit Starts Here</AnimatedText>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="gradient-primary bg-clip-text text-transparent"
            >
              Find Your Sound
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-[#B0B0B0] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Browse millions of production beats or upload your own. Get your music in front of millions of fans worldwide.
          </motion.p>
        </motion.div>

        {/* Enhanced search bar with glow effects */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div
            className={`relative group transition-all duration-300 ${
              isSearchFocused
                ? 'shadow-2xl shadow-[#2F80ED]'
                : 'shadow-lg shadow-black/50'
            }`}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2F80ED] to-[#6E33FF] rounded-lg opacity-0 group-focus-within:opacity-20 transition duration-500 blur" />

            <input
              type="text"
              placeholder="Search beats, producers, genres..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="relative w-full px-6 py-4 bg-[#1E1E1E] border-2 border-[#2A2A2A] text-white placeholder-[#707070] rounded-lg focus:outline-none focus:border-[#2F80ED] transition-all duration-300 hover:border-[#2F80ED]/50"
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-lg gradient-primary text-white hover:shadow-lg hover:shadow-[#2F80ED] transition-all"
            >
              <Search size={20} />
            </motion.button>
          </div>

          {/* Quick filter tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 mt-6 justify-center"
          >
            {['Trap', 'Hip-Hop', 'R&B', 'Drill'].map((tag, i) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: '#2F80ED' }}
                className="px-4 py-2 rounded-full border border-[#2A2A2A] text-sm text-[#B0B0B0] hover:border-[#2F80ED] hover:text-white bg-transparent transition-all"
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        </motion.form>

        {/* Featured beat showcase with audio visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#2A2A2A] shadow-2xl group">
            {/* Animated background image */}
            <motion.img
              src="/music-studio-production-beat-making.jpg"
              alt="Featured beat studio"
              className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />

            {/* Audio visualizer with floating animation */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-8 left-8 right-8 flex justify-center"
            >
              <div className="bg-[#1E1E1E]/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#2A2A2A]">
                <AudioVisualizer />
              </div>
            </motion.div>

            {/* Floating play button with glow */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-8 right-8"
            >
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-white shadow-2xl shadow-[#2F80ED]/50 hover:shadow-[#2F80ED] transition-all group/btn"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-[#2F80ED] opacity-50"
                />
                <Play size={32} fill="white" />
              </motion.button>
            </motion.div>

            {/* Beat info card */}
            <div className="absolute bottom-8 left-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="backdrop-blur-md bg-[#1E1E1E]/60 px-6 py-4 rounded-2xl border border-[#2A2A2A]"
              >
                <p className="text-xs text-[#27AE60] font-bold tracking-wider">FEATURED BEAT</p>
                <h3 className="text-2xl font-bold text-white mt-2">Midnight Vibes</h3>
                <div className="flex items-center gap-2 mt-3 text-sm text-[#B0B0B0]">
                  <span className="px-2 py-1 rounded bg-[#2F80ED]/20 text-[#2F80ED]">Premium</span>
                  <span>•</span>
                  <span>147 BPM</span>
                  <span>•</span>
                  <span className="text-[#27AE60]">Trending</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

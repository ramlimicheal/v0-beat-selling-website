'use client'

import { useState } from 'react'
import { Search, Play, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import ParticleBackground from './particle-background'
import AudioVisualizer from './audio-visualizer'

interface HeroProps {
  onSearch: (query: string) => void
}

export default function EnhancedHero({ onSearch }: HeroProps) {
  const [searchInput, setSearchInput] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchInput)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <>
      <ParticleBackground />
      
      <div className="relative pt-28 pb-32 overflow-hidden">
        {/* Gradient orbs with enhanced animations */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -30, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-10 left-5 w-96 h-96 bg-[#2F80ED] rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          />
          <motion.div
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 30, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute bottom-20 right-5 w-96 h-96 bg-[#6E33FF] rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          />
          <motion.div
            animate={{
              x: [0, 20, -30, 0],
              y: [0, 20, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#27AE60] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main headline with advanced animations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <motion.div variants={textVariants} className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full glass-effect text-sm font-medium text-[#2F80ED] mb-6">
                <Zap className="inline mr-2" size={14} />
                Discover Premium Beats Instantly
              </span>
            </motion.div>

            <motion.h1
              variants={textVariants}
              className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight"
            >
              Your First Hit
              <br />
              <motion.span
                className="gradient-primary bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
              >
                Starts Here
              </motion.span>
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="text-lg sm:text-xl text-[#B0B0B0] mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Access millions of production-ready beats with advanced filtering, direct producer messaging, and instant licensing. Start making hits today.
            </motion.p>
          </motion.div>

          {/* Advanced search with animations */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto mb-20"
          >
            <motion.div
              animate={{
                boxShadow: isSearchFocused
                  ? '0 0 40px rgba(47, 128, 237, 0.4)'
                  : '0 0 20px rgba(47, 128, 237, 0.2)',
              }}
              className="relative group"
            >
              <input
                type="text"
                placeholder="Search beats, producers, genres, moods..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full px-8 py-5 bg-[#1E1E1E] border border-[#2A2A2A] text-white placeholder-[#808080] rounded-xl focus:outline-none focus:border-[#2F80ED] transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-lg gradient-primary hover:shadow-lg hover:shadow-[#2F80ED] text-white transition-all"
              >
                <Search size={20} />
              </motion.button>
            </motion.div>

            {/* Quick filters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mt-6"
            >
              {['Trap', 'Hip-Hop', 'R&B', 'Lo-Fi', 'Electronic'].map((tag, index) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="px-4 py-2 rounded-lg glass-effect text-sm text-white hover:border-[#2F80ED] border border-[#2A2A2A] transition-all"
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>
          </motion.form>

          {/* Featured beat card with advanced micro interactions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative max-w-5xl mx-auto group"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 20px 60px rgba(47, 128, 237, 0.2)',
                  '0 30px 80px rgba(47, 128, 237, 0.4)',
                  '0 20px 60px rgba(47, 128, 237, 0.2)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="relative bg-gradient-to-br from-[#1E1E1E] to-[#0f0f0f] rounded-3xl overflow-hidden border border-[#2A2A2A]"
            >
              {/* Background image with overlay */}
              <div className="relative h-96 overflow-hidden">
                <img
                  src="/music-studio-production-beat-making.jpg"
                  alt="Featured beat studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />

                {/* Audio visualizer overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center opacity-30"
                >
                  <AudioVisualizer />
                </motion.div>
              </div>

              {/* Content section */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-xs font-bold text-[#2F80ED] mb-2 tracking-widest"
                    >
                      FEATURED BEAT
                    </motion.p>
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 }}
                      className="text-3xl font-bold text-white mb-3"
                    >
                      Midnight Vibes
                    </motion.h3>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-wrap gap-4 text-sm text-[#B0B0B0]"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#27AE60]"></span>Premium
                      </span>
                      <span>147 BPM</span>
                      <span>Trap</span>
                      <span>2:45</span>
                    </motion.div>
                  </div>

                  {/* Floating play button */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white hover:shadow-2xl hover:shadow-[#2F80ED] transition-all flex-shrink-0"
                  >
                    <Play size={28} fill="white" />
                  </motion.button>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 bg-[#2F80ED] hover:bg-[#256BBF] text-white font-semibold rounded-lg transition-all"
                  >
                    Listen & License
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border border-[#2A2A2A] hover:border-[#2F80ED] text-white font-semibold rounded-lg transition-all"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-20 -right-20 w-40 h-40 border border-[#2F80ED] rounded-full opacity-10 pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-20 -left-20 w-40 h-40 border border-[#6E33FF] rounded-full opacity-10 pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </>
  )
}

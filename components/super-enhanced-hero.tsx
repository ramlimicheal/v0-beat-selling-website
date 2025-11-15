'use client'

import { useState, useEffect } from 'react'
import { Search, Play, TrendingUp, Users, Music, Sparkles } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useAudio } from '@/contexts/audio-context'

interface HeroProps {
  onSearch: (query: string) => void
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <motion.div
        className="text-3xl sm:text-4xl font-bold gradient-primary bg-clip-text text-transparent"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-[#B0B0B0] mt-1">{label}</div>
    </motion.div>
  )
}

function ThreeDParticles() {
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: [
              `${particle.x}%`,
              `${(particle.x + 40) % 100}%`,
              `${particle.x}%`,
            ],
            y: [
              `${particle.y}%`,
              `${(particle.y - 50) % 100}%`,
              `${particle.y}%`,
            ],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full bg-gradient-to-r from-[#2F80ED] to-[#27AE60]"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: `0 0 ${particle.size * 4}px rgba(47, 128, 237, 0.5)`,
          }}
        />
      ))}
    </div>
  )
}

function WaveformVisualizer({ isPlaying }: { isPlaying: boolean }) {
  const bars = Array.from({ length: 40 })

  return (
    <div className="flex items-end justify-center gap-1 h-24">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          animate={
            isPlaying
              ? {
                  height: [
                    Math.random() * 40 + 10,
                    Math.random() * 70 + 20,
                    Math.random() * 40 + 10,
                  ],
                }
              : { height: 20 }
          }
          transition={{
            duration: 0.8,
            delay: i * 0.02,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut',
          }}
          className="w-1 rounded-full bg-gradient-to-t from-[#2F80ED] via-[#27AE60] to-[#6E33FF]"
          style={{
            boxShadow: '0 0 10px rgba(47, 128, 237, 0.5)',
          }}
        />
      ))}
    </div>
  )
}

function FloatingBeatCard() {
  const [isHovered, setIsHovered] = useState(false)
  const audio = useAudio()

  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotateY: isHovered ? [0, 5, 0] : 0,
      }}
      transition={{
        y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        rotateY: { duration: 0.6 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-[#2F80ED] to-[#27AE60] rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      <div className="relative bg-gradient-to-br from-[#1E1E1E] to-[#121212] rounded-2xl overflow-hidden border border-[#2F80ED]/30 shadow-2xl">
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src="/music-studio-production-beat-making.jpg"
            alt="Featured Beat"
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6 }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />

          <motion.div
            className="absolute top-4 right-4"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-3 py-1 bg-[#27AE60]/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
              TRENDING #1
            </span>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => audio.play({
                id: 'featured-1',
                title: 'Midnight Vibes',
                artist: 'Premium Producer',
                url: '/sample-beat.mp3',
                image: '/music-studio-production-beat-making.jpg',
                duration: 180,
                price: 49.99
              })}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-[#2F80ED] to-[#27AE60] flex items-center justify-center shadow-2xl shadow-[#2F80ED]/60"
            >
              <Play size={32} fill="white" className="text-white ml-1" />
            </motion.button>
          </motion.div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Midnight Vibes</h3>
              <p className="text-[#B0B0B0] text-sm">by Premium Producer</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl font-bold gradient-primary bg-clip-text text-transparent"
            >
              $49.99
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {['Trap', '147 BPM', 'Dark', 'Premium'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#2F80ED]/20 border border-[#2F80ED]/50 text-[#2F80ED] text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <WaveformVisualizer isPlaying={audio.isPlaying && audio.currentBeat?.id === 'featured-1'} />
        </div>
      </div>
    </motion.div>
  )
}

export default function SuperEnhancedHero({ onSearch }: HeroProps) {
  const [searchInput, setSearchInput] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchInput)
  }

  return (
    <motion.div
      style={{ opacity, scale }}
      className="relative pt-32 pb-40 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(47, 128, 237, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(39, 174, 96, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(47, 128, 237, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />

        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2F80ED] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        />

        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#27AE60] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        />
      </div>

      <ThreeDParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline with advanced animations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <motion.span
              animate={{
                boxShadow: [
                  '0 0 20px rgba(47, 128, 237, 0.3)',
                  '0 0 40px rgba(47, 128, 237, 0.5)',
                  '0 0 20px rgba(47, 128, 237, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2F80ED]/20 to-[#27AE60]/20 border border-[#2F80ED]/50 text-white text-sm font-medium backdrop-blur-sm"
            >
              <Sparkles size={16} className="text-[#27AE60]" />
              Premium Marketplace for Music Producers
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight"
          >
            Your Next Hit
            <br />
            <motion.span
              className="gradient-primary bg-clip-text text-transparent inline-block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Starts Here
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-[#B0B0B0] mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Access premium beats from verified producers worldwide. Instant licensing, stems included, 100% royalty-free.
          </motion.p>

          {/* Live Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
          >
            <AnimatedCounter value="50K+" label="Premium Beats" />
            <AnimatedCounter value="10K+" label="Producers" />
            <AnimatedCounter value="1M+" label="Downloads" />
          </motion.div>
        </motion.div>

        {/* Advanced Search */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <motion.div
            animate={{
              boxShadow: isSearchFocused
                ? '0 0 60px rgba(47, 128, 237, 0.4), 0 0 100px rgba(39, 174, 96, 0.2)'
                : '0 0 30px rgba(47, 128, 237, 0.2)',
            }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-[#2F80ED] via-[#27AE60] to-[#2F80ED] rounded-2xl opacity-20 group-focus-within:opacity-40 blur transition-opacity"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            />

            <div className="relative flex items-center bg-[#1E1E1E] rounded-2xl border border-[#2F80ED]/30">
              <Search className="absolute left-6 text-[#B0B0B0]" size={24} />
              <input
                type="text"
                placeholder="Search beats, producers, genres, moods, BPM..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full px-16 py-6 bg-transparent text-white placeholder-[#707070] text-lg outline-none"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-3 px-8 py-3 rounded-xl bg-gradient-to-r from-[#2F80ED] to-[#27AE60] text-white font-semibold hover:shadow-lg hover:shadow-[#2F80ED]/50 transition-all"
              >
                Search
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {['Trap', 'Hip-Hop', 'R&B', 'Lo-Fi', 'Electronic', 'Drill'].map(
              (tag, index) => (
                <motion.button
                  key={tag}
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl bg-[#1E1E1E] border border-[#2F80ED]/30 text-white hover:border-[#2F80ED] hover:bg-[#2F80ED]/10 transition-all font-medium"
                >
                  {tag}
                </motion.button>
              )
            )}
          </motion.div>
        </motion.form>

        {/* Featured Beat Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-2xl mx-auto"
        >
          <FloatingBeatCard />
        </motion.div>
      </div>
    </motion.div>
  )
}

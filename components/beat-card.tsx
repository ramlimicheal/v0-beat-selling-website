'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, ShoppingCart, Heart } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

interface Beat {
  id: string | number
  title: string
  artist: string
  price: number | string
  plays?: string
  image: string
  genre?: string
  bpm?: number
  likes?: number
}

interface BeatCardProps {
  beat: Beat
  size?: 'small' | 'medium' | 'large'
}

export default function BeatCard({ beat, size = 'medium' }: BeatCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const sizeClasses = {
    small: 'rounded-lg overflow-hidden',
    medium: 'rounded-xl overflow-hidden',
    large: 'rounded-2xl overflow-hidden',
  }

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group cursor-pointer h-full ${sizeClasses[size]}`}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 border border-purple-500/20 h-full overflow-hidden rounded-lg shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all">
        {/* Image container with enhanced overlay */}
        <div className="relative overflow-hidden bg-[#121212]">
          <motion.img
            src={beat.image}
            alt={beat.title}
            className="w-full aspect-square object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.5 }}
          />

          {/* Multi-layer overlay with animated gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"
          />

          {/* Animated background particles on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                    transition={{ duration: 0.6 }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Play button with advanced animation */}
          <motion.button
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={isHovered ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -180 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-blue-500/60 hover:shadow-blue-500/100 transition-all"
            >
              <Play size={28} fill="white" className="text-white ml-1" />
            </motion.div>
          </motion.button>

          {/* Favorite button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full bg-gray-900/80 backdrop-blur-sm border border-purple-500/50 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500 transition-all"
            >
              <Heart
                size={20}
                className={`transition ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
              />
            </motion.div>
          </motion.button>

          {/* Badge with genre info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 left-3 flex gap-2"
          >
            <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              {beat.genre || 'Beat'}
            </span>
          </motion.div>

          {/* BPM badge */}
          {beat.bpm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute bottom-3 right-3"
            >
              <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                {beat.bpm} BPM
              </span>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-white truncate text-sm md:text-base group-hover:text-blue-400 transition">
                {beat.title}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm truncate">{beat.artist}</p>
            </div>
          </div>

          {/* Stats with animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between items-center text-xs text-gray-400 mb-3"
          >
            {beat.plays && <span>{beat.plays}</span>}
            {beat.likes && (
              <motion.span
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1 }}
              >
                <Heart size={12} /> {beat.likes}
              </motion.span>
            )}
          </motion.div>

          {/* Footer with price and button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center gap-2"
          >
            <span className="font-bold text-blue-400 text-lg">${beat.price}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition shadow-lg hover:shadow-blue-500/50"
            >
              <ShoppingCart size={14} />
              <span>Buy</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

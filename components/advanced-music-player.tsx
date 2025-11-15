'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share2, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Track {
  id: string
  title: string
  artist: string
  duration: number
  waveform?: number[]
}

interface AdvancedMusicPlayerProps {
  track: Track
  isPlaying?: boolean
  onPlay?: () => void
  onPause?: () => void
  variant?: 'compact' | 'full'
}

export default function AdvancedMusicPlayer({
  track,
  isPlaying: externalIsPlaying = false,
  onPlay,
  onPause,
  variant = 'full'
}: AdvancedMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(externalIsPlaying)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsPlaying(externalIsPlaying)
  }, [externalIsPlaying])

  const handlePlayPause = () => {
    const newState = !isPlaying
    setIsPlaying(newState)
    if (newState) onPlay?.()
    else onPause?.()
  }

  const handleProgressClick = (e: React.MouseEvent) => {
    if (!progressRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    setCurrentTime(percent * track.duration)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (currentTime / track.duration) * 100 || 0

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-lg p-3 border border-purple-500/30"
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </motion.button>

          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{track.title}</p>
            <p className="text-gray-400 text-xs truncate">{track.artist}</p>
          </div>

          <span className="text-gray-400 text-xs whitespace-nowrap">{formatTime(currentTime)}</span>
        </div>

        {/* Waveform progress */}
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="mt-2 h-1 bg-gray-700/50 rounded-full cursor-pointer overflow-hidden group"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'tween', duration: 0.1 }}
          />
        </div>
      </motion.div>
    )
  }

  // Full variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-b from-purple-900/10 to-blue-900/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-2xl"
    >
      {/* Track info */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-1">{track.title}</h3>
        <p className="text-gray-400 text-lg">{track.artist}</p>
      </div>

      {/* Animated waveform visualization */}
      <div className="mb-6 flex items-center justify-center h-16 gap-1">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
            animate={{
              height: isPlaying ? [20, 40, 20] : 20,
              opacity: progress > (i / 30) * 100 ? 1 : 0.3
            }}
            transition={{
              duration: 0.5,
              delay: i * 0.05,
              repeat: isPlaying ? Infinity : 0
            }}
          />
        ))}
      </div>

      {/* Time and progress */}
      <div className="mb-4">
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="h-2 bg-gray-700/50 rounded-full cursor-pointer group overflow-hidden mb-3"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/50"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'tween', duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <SkipBack size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePlayPause}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white hover:shadow-2xl hover:shadow-blue-500/50 transition-all"
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <SkipForward size={24} />
        </motion.button>
      </div>

      {/* Secondary controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFavorited(!isFavorited)}
            className="p-2 rounded-full hover:bg-purple-500/20 transition-colors"
          >
            <Heart
              size={20}
              className={isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-purple-500/20 transition-colors text-gray-400"
          >
            <Share2 size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-purple-500/20 transition-colors text-gray-400"
          >
            <Download size={20} />
          </motion.button>
        </div>

        {/* Volume control */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowVolume(!showVolume)}
            className="p-2 rounded-full hover:bg-purple-500/20 transition-colors text-gray-400"
          >
            <Volume2 size={20} />
          </motion.button>

          <AnimatePresence>
            {showVolume && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-12 right-0 bg-gray-800 border border-purple-500/30 rounded-lg p-3 w-12"
              >
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-full h-24 vertical-slider"
                  style={{
                    writingMode: 'bt-lr',
                    WebkitAppearance: 'slider-vertical',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

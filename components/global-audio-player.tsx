'use client'

import { useAudio } from '@/contexts/audio-context'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react'
import { motion } from 'framer-motion'

export default function GlobalAudioPlayer() {
  const { currentBeat, isPlaying, pause, resume, stop, seek, currentTime, volume, setVolume } = useAudio()

  if (!currentBeat) return null

  const progress = (currentTime / (currentBeat.duration || 100)) * 100

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#121212]/95 to-[#1E1E1E]/80 border-t border-[#6E33FF]/20 backdrop-blur-xl z-40 px-4 py-3 sm:px-6 sm:py-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#2A2A2A]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#6E33FF] to-[#27AE60]"
            style={{ width: `${progress}%` }}
            transition={{ type: 'tween', duration: 0.1 }}
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Beat info */}
          <div className="flex-1 min-w-0">
            <motion.div className="flex items-center gap-3">
              <motion.img
                src={currentBeat.image}
                alt={currentBeat.title}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover"
                layoutId="player-image"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-bold text-white truncate">{currentBeat.title}</p>
                <p className="text-xs sm:text-sm text-[#B0B0B0] truncate">{currentBeat.artist}</p>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-[#B0B0B0] hover:text-white transition">
              <SkipBack size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={isPlaying ? pause : resume}
              className="p-3 bg-gradient-to-r from-[#6E33FF] to-[#27AE60] text-white rounded-full hover:shadow-lg hover:shadow-[#6E33FF]/50 transition"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} fill="white" />}
            </motion.button>

            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-[#B0B0B0] hover:text-white transition">
              <SkipForward size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
              className="p-2 text-[#B0B0B0] hover:text-white transition hidden sm:flex"
            >
              {volume > 0 ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </motion.button>

            <div className="w-20 hidden sm:block">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#6E33FF]"
              />
            </div>
          </div>

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={stop}
            className="p-2 text-[#B0B0B0] hover:text-white transition ml-2 sm:ml-4"
          >
            ✕
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

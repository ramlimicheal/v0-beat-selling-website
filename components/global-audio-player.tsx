'use client'

import { useState } from 'react'
import { useAudio } from '@/contexts/audio-context'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Repeat, Repeat1, Shuffle, List, Heart, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GlobalAudioPlayer() {
  const {
    currentBeat,
    isPlaying,
    pause,
    resume,
    stop,
    seek,
    currentTime,
    volume,
    setVolume,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
    isShuffle,
    repeatMode,
    queue
  } = useAudio()

  const [showQueue, setShowQueue] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!currentBeat) return null

  const progress = (currentTime / (currentBeat.duration || 100)) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Queue Panel */}
      <AnimatePresence>
        {showQueue && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed right-0 bottom-24 w-96 h-[500px] bg-gradient-to-b from-[#1E1E1E] to-[#121212] border-l border-t border-[#2F80ED]/30 rounded-tl-2xl backdrop-blur-xl z-50 overflow-hidden shadow-2xl"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Queue ({queue.length})</h3>
                <button
                  onClick={() => setShowQueue(false)}
                  className="text-[#B0B0B0] hover:text-white transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
                {queue.map((beat, index) => (
                  <motion.div
                    key={beat.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-3 rounded-lg border border-[#2A2A2A] hover:border-[#2F80ED] transition ${
                      currentBeat?.id === beat.id ? 'bg-[#2F80ED]/20 border-[#2F80ED]' : 'bg-[#1A1A1A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={beat.image}
                        alt={beat.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{beat.title}</p>
                        <p className="text-xs text-[#B0B0B0] truncate">{beat.artist}</p>
                      </div>
                      {currentBeat?.id === beat.id && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-[#27AE60]"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#121212]/95 to-[#1E1E1E]/80 border-t border-[#2F80ED]/20 backdrop-blur-xl z-40 px-4 py-3 sm:px-6 sm:py-4"
      >
      <div className="max-w-7xl mx-auto">
        {/* Interactive Progress bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-[#2A2A2A] cursor-pointer group hover:h-2 transition-all"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const percent = (e.clientX - rect.left) / rect.width
            seek(percent * (currentBeat.duration || 100))
          }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[#2F80ED] via-[#27AE60] to-[#6E33FF] relative"
            style={{ width: `${progress}%` }}
            transition={{ type: 'tween', duration: 0.1 }}
          >
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-lg"
              whileHover={{ scale: 1.5 }}
            />
          </motion.div>
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

          {/* Time Display */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-[#B0B0B0]">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(currentBeat.duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Shuffle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleShuffle}
              className={`p-2 rounded transition hidden sm:flex ${
                isShuffle ? 'text-[#27AE60]' : 'text-[#B0B0B0] hover:text-white'
              }`}
            >
              <Shuffle size={16} />
            </motion.button>

            {/* Previous */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={playPrevious}
              className="p-2 text-[#B0B0B0] hover:text-white transition"
            >
              <SkipBack size={18} />
            </motion.button>

            {/* Play/Pause */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={isPlaying ? pause : resume}
              className="p-3 bg-gradient-to-r from-[#2F80ED] to-[#27AE60] text-white rounded-full hover:shadow-lg hover:shadow-[#2F80ED]/50 transition"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} fill="white" />}
            </motion.button>

            {/* Next */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={playNext}
              className="p-2 text-[#B0B0B0] hover:text-white transition"
            >
              <SkipForward size={18} />
            </motion.button>

            {/* Repeat */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleRepeat}
              className={`p-2 rounded transition hidden sm:flex ${
                repeatMode !== 'off' ? 'text-[#27AE60]' : 'text-[#B0B0B0] hover:text-white'
              }`}
            >
              {repeatMode === 'one' ? <Repeat1 size={16} /> : <Repeat size={16} />}
            </motion.button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Favorite */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded transition hidden sm:flex"
            >
              <Heart
                size={18}
                className={isFavorite ? 'fill-[#27AE60] text-[#27AE60]' : 'text-[#B0B0B0] hover:text-white'}
              />
            </motion.button>

            {/* Queue */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowQueue(!showQueue)}
              className={`p-2 rounded transition hidden sm:flex relative ${
                showQueue ? 'text-[#2F80ED]' : 'text-[#B0B0B0] hover:text-white'
              }`}
            >
              <List size={18} />
              {queue.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#27AE60] rounded-full text-xs flex items-center justify-center text-white">
                  {queue.length}
                </span>
              )}
            </motion.button>

            {/* Volume */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
              className="p-2 text-[#B0B0B0] hover:text-white transition hidden sm:flex"
            >
              {volume > 0 ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </motion.button>

            <div className="w-20 hidden lg:block">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#2F80ED]"
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
    </>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Flag, Eye, Download, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import AdvancedMusicPlayer from '@/components/advanced-music-player'
import Footer from '@/components/footer'

// Mock beat data
const beatData = {
  id: '1',
  title: 'Midnight Dreams',
  artist: 'Producer Name',
  artistId: 'producer-1',
  price: 29.99,
  image: '/beat-cover-dark-neon.jpg',
  streams: 125000,
  likes: 3400,
  bpm: 95,
  key: 'C Minor',
  genre: 'Trap',
  tags: ['dark', 'atmospheric', 'cinematic'],
  duration: 240,
  description: 'High-energy trap beat with atmospheric synths and hard-hitting drums. Perfect for hip-hop and rap tracks. Professional quality production.',
  license: 'Exclusive',
  stats: [
    { label: 'Streams', value: '125K', icon: Eye },
    { label: 'Favorites', value: '3.4K', icon: Star },
    { label: 'Quality', value: '320 kbps', icon: Download }
  ]
}

export default function BeatDetailPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] to-[#0a0a0a]">
      <Navigation />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="container mx-auto px-4 pt-8"
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Beats
          </motion.button>
        </Link>
      </motion.div>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          {/* Left - Beat cover and player */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl overflow-hidden mb-6 shadow-2xl"
            >
              <img
                src={beatData.image || "/placeholder.svg"}
                alt={beatData.title}
                className="w-full h-96 object-cover"
              />
            </motion.div>

            <AdvancedMusicPlayer
              track={{
                id: beatData.id,
                title: beatData.title,
                artist: beatData.artist,
                duration: beatData.duration
              }}
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              variant="full"
            />
          </motion.div>

          {/* Right - Beat info and purchase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-b from-purple-900/10 to-blue-900/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 h-fit sticky top-24"
          >
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">{beatData.title}</h1>
              <Link href={`/artist/${beatData.artistId}`}>
                <motion.p
                  whileHover={{ color: '#2F80ED' }}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-lg"
                >
                  {beatData.artist}
                </motion.p>
              </Link>
            </div>

            {/* Beat specs */}
            <div className="grid grid-cols-3 gap-3 mb-6 py-6 border-y border-purple-500/20">
              <div className="text-center">
                <p className="text-gray-400 text-sm">{beatData.bpm} BPM</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">{beatData.key}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">{beatData.genre}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3 mb-6">
              {beatData.stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon size={18} className="text-blue-400" />
                    <span className="text-sm">{stat.label}: {stat.value}</span>
                  </motion.div>
                )
              })}
            </div>

            {/* Price and purchase */}
            <div className="space-y-3 mb-6">
              <div className="text-4xl font-bold text-white">${beatData.price}</div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(47, 128, 237, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </motion.button>
            </div>

            {/* License info */}
            <div className="bg-purple-500/10 rounded-lg p-3 text-sm text-gray-300 mb-4">
              License: <span className="text-purple-400 font-semibold">{beatData.license}</span>
            </div>

            {/* Secondary actions */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-2 rounded-lg border border-purple-500/30 text-gray-300 hover:bg-purple-500/10 transition-colors flex items-center justify-center gap-2"
              >
                <Star size={18} />
                Save
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-2 rounded-lg border border-purple-500/30 text-gray-300 hover:bg-purple-500/10 transition-colors flex items-center justify-center gap-2"
              >
                <Flag size={18} />
                Report
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Description and tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-b from-purple-900/10 to-blue-900/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20"
        >
          <h2 className="text-xl font-bold text-white mb-4">About this beat</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">{beatData.description}</p>

          <div className="flex flex-wrap gap-2">
            {beatData.tags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(47, 128, 237, 0.2)' }}
                className="px-4 py-2 rounded-full bg-purple-500/10 text-blue-400 border border-purple-500/30 text-sm hover:border-blue-500/50 transition-all"
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

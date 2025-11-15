'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle, Share2, VerifiedIcon } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import BeatCard from '@/components/beat-card'
import Footer from '@/components/footer'

// Mock artist data
const artistData = {
  id: 'producer-1',
  name: 'Producer Name',
  verified: true,
  image: '/producer-avatar.jpg',
  followers: 15200,
  beatsCount: 342,
  bio: 'Award-winning producer specializing in trap and hip-hop beats. 10+ years of production experience.',
  socialLinks: {
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    soundcloud: 'https://soundcloud.com'
  },
  beats: Array.from({ length: 8 }, (_, i) => ({
    id: `beat-${i + 1}`,
    title: `Beat ${i + 1}`,
    artist: 'Producer Name',
    price: 29.99,
    image: `/placeholder.svg?height=200&width=200&query=beat-cover-${i}`,
    genre: 'Trap',
    bpm: 95 + (i % 3) * 5,
    likes: 1200 + (i * 100),
  }))
}

export default function ArtistPage({ params }: { params: { id: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)

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

      <main className="container mx-auto px-4">
        {/* Artist header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 mb-12 flex flex-col md:flex-row items-center md:items-end gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0"
          >
            <img
              src={artistData.image || "/placeholder.svg"}
              alt={artistData.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-white">{artistData.name}</h1>
              {artistData.verified && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-blue-400"
                >
                  <VerifiedIcon size={32} fill="currentColor" />
                </motion.div>
              )}
            </div>

            <p className="text-gray-400 mb-4 text-lg max-w-2xl">{artistData.bio}</p>

            <div className="flex items-center gap-6 mb-6">
              <div>
                <p className="text-gray-400 text-sm">Followers</p>
                <p className="text-2xl font-bold text-white">{artistData.followers.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Beats</p>
                <p className="text-2xl font-bold text-white">{artistData.beatsCount}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  isFollowing
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'border border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg border border-purple-500/30 text-gray-300 hover:bg-purple-500/10 transition-all flex items-center gap-2"
              >
                <MessageCircle size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg border border-purple-500/30 text-gray-300 hover:bg-purple-500/10 transition-all flex items-center gap-2"
              >
                <Share2 size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Beats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Featured Beats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artistData.beats.map((beat, idx) => (
              <motion.div
                key={beat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <BeatCard beat={beat} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

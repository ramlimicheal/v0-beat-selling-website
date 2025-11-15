'use client'

import { motion } from 'framer-motion'
import BeatCard from './beat-card'

const trendingBeats = [
  { id: 1, title: 'Midnight Vibes', artist: 'Producer Name', price: '$29', plays: '12.5K', image: '/dark-moody-beat-album-art.jpg' },
  { id: 2, title: 'Electric Pulse', artist: 'Beat Master', price: '$49', plays: '8.3K', image: '/neon-electric-beat-artwork.jpg' },
  { id: 3, title: 'Jazz Flow', artist: 'Smooth Beats', price: '$39', plays: '5.2K', image: '/jazz-beats-album-cover.jpg' },
  { id: 4, title: 'Trap Energy', artist: 'Urban Sound', price: '$44', plays: '15.8K', image: '/trap-beat-artwork.jpg' },
  { id: 5, title: 'Lo-Fi Dreams', artist: 'Chill Maker', price: '$24', plays: '22.1K', image: '/lo-fi-chill-beat.jpg' },
  { id: 6, title: 'Hip-Hop Gold', artist: 'Raw Beats', price: '$54', plays: '18.9K', image: '/hip-hop-beat-artwork.jpg' },
]

export default function TrendingBeats() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Trending Now</h2>
          <p className="text-[#B0B0B0] text-lg">Check out the hottest beats this week</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {trendingBeats.map((beat, index) => (
            <motion.div
              key={beat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <BeatCard beat={beat} size="small" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

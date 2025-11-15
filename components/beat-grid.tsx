'use client'

import { motion } from 'framer-motion'
import BeatCard from './beat-card'

interface BeatGridProps {
  category: string
  title: string
}

const beatData: Record<string, Array<{ id: number; title: string; artist: string; price: string; plays: string; image: string }>> = {
  trending: [
    { id: 1, title: 'Summer Nights', artist: 'Beat Wizard', price: '$39', plays: '28.5K', image: '/summer-beat-vibrant-artwork.jpg' },
    { id: 2, title: 'Neon City', artist: 'Synth Master', price: '$49', plays: '19.2K', image: '/neon-city-synthwave-beat.jpg' },
    { id: 3, title: 'Chasing Dreams', artist: 'Cloud Beats', price: '$44', plays: '15.7K', image: '/dreamy-atmospheric-beat.jpg' },
    { id: 4, title: 'Street Legends', artist: 'Urban Vibes', price: '$54', plays: '32.1K', image: '/street-hip-hop-beat-artwork.jpg' },
  ],
  featured: [
    { id: 5, title: 'Smooth Criminal', artist: 'Jazz Collective', price: '$34', plays: '11.3K', image: '/smooth-jazz-beat-artwork.jpg' },
    { id: 6, title: 'Rock Anthem', artist: 'Thunder Beats', price: '$59', plays: '24.8K', image: '/rock-beat-artwork.jpg' },
    { id: 7, title: 'Tropical Vibes', artist: 'Island Sounds', price: '$29', plays: '8.5K', image: '/tropical-reggae-beat.jpg' },
    { id: 8, title: 'Dark Matter', artist: 'Shadow Beats', price: '$64', plays: '41.2K', image: '/dark-techno-industrial-beat.jpg' },
  ],
  popular: [
    { id: 9, title: 'Golden Hour', artist: 'Sunny Beats', price: '$44', plays: '56.3K', image: '/placeholder.svg?height=300&width=300' },
    { id: 10, title: 'Digital Dreams', artist: 'Future Sound', price: '$49', plays: '47.8K', image: '/placeholder.svg?height=300&width=300' },
    { id: 11, title: 'Soul Connection', artist: 'Soul Beats', price: '$39', plays: '33.5K', image: '/placeholder.svg?height=300&width=300&b+beat=' },
    { id: 12, title: 'Phoenix Rising', artist: 'Epic Beats', price: '$69', plays: '62.1K', image: '/placeholder.svg?height=300&width=300' },
  ],
}

export default function BeatGrid({ category, title }: BeatGridProps) {
  const beats = beatData[category] || []

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex justify-between items-end"
        >
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
            <p className="text-[#B0B0B0]">Explore curated collections from top producers</p>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            className="hidden md:block px-6 py-2 text-[#2F80ED] border border-[#2F80ED] rounded-lg hover:bg-[#2F80ED]/10 transition font-medium"
          >
            View All →
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {beats.map((beat, index) => (
            <motion.div
              key={beat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BeatCard beat={beat} size="medium" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

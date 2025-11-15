'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sliders, ArrowUpDown, X } from 'lucide-react'
import Navigation from '@/components/navigation'
import BeatCard from '@/components/beat-card'
import Footer from '@/components/footer'

const genres = ['All', 'Trap', 'Hip-Hop', 'Drill', 'R&B', 'Jazz', 'Electronic', 'Lo-Fi', 'Reggae']
const moods = ['Dark', 'Atmospheric', 'Energetic', 'Chill', 'Cinematic', 'Uplifting', 'Melancholic']
const sortOptions = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rated', value: 'rated' },
]

const mockBeats = Array.from({ length: 30 }, (_, i) => ({
  id: `beat-${i + 1}`,
  title: `Premium Beat ${i + 1}`,
  artist: `Producer ${Math.ceil(Math.random() * 10)}`,
  price: 24.99 + Math.random() * 50,
  image: `/placeholder.svg?height=300&width=300&query=beat-cover-${i}`,
  genre: genres[Math.floor(Math.random() * (genres.length - 1)) + 1],
  bpm: 80 + Math.floor(Math.random() * 100),
  likes: 1000 + Math.floor(Math.random() * 5000),
  plays: Math.floor(Math.random() * 50000),
}))

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [selectedMood, setSelectedMood] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 })
  const [filteredBeats, setFilteredBeats] = useState(mockBeats)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(query, selectedGenre, selectedMood, sortBy)
  }

  const applyFilters = (search: string, genre: string, mood: string, sort: string) => {
    let filtered = mockBeats.filter((beat) => {
      const matchesSearch = search === '' || 
        beat.title.toLowerCase().includes(search.toLowerCase()) ||
        beat.artist.toLowerCase().includes(search.toLowerCase())
      
      const matchesGenre = genre === 'All' || beat.genre === genre
      const matchesPrice = beat.price >= priceRange.min && beat.price <= priceRange.max

      return matchesSearch && matchesGenre && matchesPrice
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rated':
          return b.likes - a.likes
        case 'newest':
          return b.id.localeCompare(a.id)
        default:
          return b.plays - a.plays
      }
    })

    setFilteredBeats(filtered)
  }

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre)
    applyFilters(searchQuery, genre, selectedMood, sortBy)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    applyFilters(searchQuery, selectedGenre, selectedMood, sort)
  }

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedGenre('All')
    setSelectedMood('')
    setSortBy('popular')
    setPriceRange({ min: 0, max: 100 })
    setFilteredBeats(mockBeats)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] to-[#0a0a0a]">
      <Navigation />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search header with enhanced design */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-8">Discover Beats</h1>

            {/* Advanced search bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6E33FF] to-[#27AE60] rounded-xl opacity-0 group-focus-within:opacity-20 transition duration-500 blur" />
                <div className="relative bg-[#1E1E1E] border border-[#2A2A2A] group-focus-within:border-[#6E33FF] rounded-xl overflow-hidden transition">
                  <Search className="absolute left-4 top-4 text-[#B0B0B0]" size={20} />
                  <input
                    type="text"
                    placeholder="Search beats, producers, genres..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full bg-transparent pl-12 pr-4 py-3 text-white placeholder-[#707070] outline-none text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Sort dropdown */}
              <motion.div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full sm:w-48 px-4 py-3 bg-[#1E1E1E] border border-[#2A2A2A] hover:border-[#6E33FF] text-white rounded-xl outline-none transition appearance-none cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ArrowUpDown className="absolute right-4 top-3.5 text-[#B0B0B0] pointer-events-none" size={18} />
              </motion.div>

              {/* Filters toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-gradient-to-r from-[#6E33FF] to-[#27AE60] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#6E33FF]/30 transition flex items-center justify-center gap-2"
              >
                <Sliders size={18} />
                <span className="hidden sm:inline">Filters</span>
              </motion.button>
            </div>

            {/* Active filters display */}
            <AnimatePresence>
              {(selectedGenre !== 'All' || selectedMood || searchQuery) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-wrap gap-2 mt-6"
                >
                  {selectedGenre !== 'All' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-[#6E33FF]/20 border border-[#6E33FF] text-[#6E33FF] rounded-full text-sm flex items-center gap-2"
                    >
                      {selectedGenre}
                      <button onClick={() => handleGenreChange('All')} className="hover:text-white">
                        <X size={14} />
                      </button>
                    </motion.div>
                  )}
                  {selectedMood && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-[#27AE60]/20 border border-[#27AE60] text-[#27AE60] rounded-full text-sm flex items-center gap-2"
                    >
                      {selectedMood}
                      <button onClick={() => setSelectedMood('')} className="hover:text-white">
                        <X size={14} />
                      </button>
                    </motion.div>
                  )}
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={resetFilters}
                    className="px-3 py-1 text-[#B0B0B0] hover:text-white text-sm transition"
                  >
                    Clear all
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="flex gap-8">
            {/* Advanced filters sidebar */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full lg:w-64 flex-shrink-0"
                >
                  <motion.div className="bg-gradient-to-b from-[#1E1E1E] to-[#1A1A1A] rounded-2xl p-6 border border-[#6E33FF]/20 sticky top-24 space-y-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sliders size={20} />
                      Advanced Filters
                    </h3>

                    {/* Genre filter with smooth animations */}
                    <div>
                      <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Genre</h4>
                      <div className="space-y-2">
                        {genres.map((genre, idx) => (
                          <motion.button
                            key={genre}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ x: 4 }}
                            onClick={() => handleGenreChange(genre)}
                            className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${
                              selectedGenre === genre
                                ? 'bg-gradient-to-r from-[#6E33FF] to-[#27AE60] text-white shadow-lg shadow-[#6E33FF]/30'
                                : 'text-[#B0B0B0] hover:bg-[#6E33FF]/10 hover:text-white'
                            }`}
                          >
                            {genre}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Mood filter */}
                    <div>
                      <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Mood</h4>
                      <div className="space-y-2">
                        {moods.map((mood, idx) => (
                          <motion.button
                            key={mood}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ x: 4 }}
                            onClick={() => setSelectedMood(mood)}
                            className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${
                              selectedMood === mood
                                ? 'bg-gradient-to-r from-[#6E33FF] to-[#27AE60] text-white shadow-lg'
                                : 'text-[#B0B0B0] hover:bg-[#6E33FF]/10 hover:text-white'
                            }`}
                          >
                            {mood}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Price range filter */}
                    <div>
                      <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Price Range</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-[#B0B0B0] mb-2 block">Min: ${priceRange.min.toFixed(0)}</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                            className="w-full h-1 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#6E33FF]"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[#B0B0B0] mb-2 block">Max: ${priceRange.max.toFixed(0)}</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                            className="w-full h-1 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#6E33FF]"
                          />
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetFilters}
                      className="w-full py-2 bg-[#2A2A2A] hover:bg-[#6E33FF]/20 text-white rounded-lg transition text-sm font-medium"
                    >
                      Reset Filters
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Beats grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1"
            >
              <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredBeats.map((beat, idx) => (
                    <motion.div
                      key={beat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: idx * 0.05 }}
                      layoutId={beat.id}
                    >
                      <BeatCard beat={beat} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredBeats.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-[#B0B0B0] text-xl mb-4">No beats found matching your filters</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetFilters}
                    className="px-6 py-2 bg-gradient-to-r from-[#6E33FF] to-[#27AE60] text-white rounded-lg font-semibold hover:shadow-lg"
                  >
                    Reset Filters
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

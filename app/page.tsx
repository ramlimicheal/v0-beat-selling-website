'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import SuperEnhancedHero from '@/components/super-enhanced-hero'
import TrendingBeats from '@/components/trending-beats'
import BeatGrid from '@/components/beat-grid'
import ProducerTools from '@/components/producer-tools'
import CallToAction from '@/components/call-to-action'
import Footer from '@/components/footer'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] to-[#0a0a0a]">
      <Navigation />
      <SuperEnhancedHero onSearch={setSearchQuery} />
      <TrendingBeats />
      <BeatGrid category="trending" title="Trending Beats" />
      <BeatGrid category="featured" title="Featured Artists" />
      <ProducerTools />
      <BeatGrid category="popular" title="Most Popular" />
      <CallToAction />
      <Footer />
    </div>
  )
}

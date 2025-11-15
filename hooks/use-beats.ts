import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Beat } from '@/lib/supabase/types'

export function useBeats(filters?: {
  genre?: string
  mood?: string
  minBpm?: number
  maxBpm?: number
  minPrice?: number
  maxPrice?: number
  searchQuery?: string
  sortBy?: string
}) {
  const [beats, setBeats] = useState<Beat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function fetchBeats() {
      try {
        setLoading(true)
        let query = supabase
          .from('beats')
          .select(`
            *,
            producer:profiles(
              id,
              username,
              full_name,
              avatar_url,
              is_verified
            )
          `)
          .eq('is_published', true)

        // Apply filters
        if (filters?.genre && filters.genre !== 'All') {
          query = query.eq('genre', filters.genre)
        }

        if (filters?.mood) {
          query = query.eq('mood', filters.mood)
        }

        if (filters?.minBpm) {
          query = query.gte('bpm', filters.minBpm)
        }

        if (filters?.maxBpm) {
          query = query.lte('bpm', filters.maxBpm)
        }

        if (filters?.minPrice !== undefined) {
          query = query.gte('price_basic', filters.minPrice)
        }

        if (filters?.maxPrice !== undefined) {
          query = query.lte('price_basic', filters.maxPrice)
        }

        // Apply search
        if (filters?.searchQuery) {
          const { data: searchResults } = await supabase.rpc('search_beats', {
            search_query: filters.searchQuery
          })
          setBeats(searchResults || [])
          setLoading(false)
          return
        }

        // Apply sorting
        switch (filters?.sortBy) {
          case 'price-asc':
            query = query.order('price_basic', { ascending: true })
            break
          case 'price-desc':
            query = query.order('price_basic', { ascending: false })
            break
          case 'rated':
            query = query.order('likes_count', { ascending: false })
            break
          case 'newest':
            query = query.order('created_at', { ascending: false })
            break
          default:
            query = query.order('plays_count', { ascending: false })
        }

        const { data, error: queryError } = await query.limit(50)

        if (queryError) throw queryError

        setBeats(data || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching beats:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch beats')
      } finally {
        setLoading(false)
      }
    }

    fetchBeats()
  }, [filters?.genre, filters?.mood, filters?.minBpm, filters?.maxBpm, filters?.minPrice, filters?.maxPrice, filters?.searchQuery, filters?.sortBy])

  return { beats, loading, error }
}

export function useTrendingBeats(limit = 10) {
  const [beats, setBeats] = useState<Beat[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchTrending() {
      const { data } = await supabase.rpc('get_trending_beats', {
        limit_count: limit
      })

      setBeats(data || [])
      setLoading(false)
    }

    fetchTrending()
  }, [limit])

  return { beats, loading }
}

export function useBeat(beatId: string) {
  const [beat, setBeat] = useState<Beat | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchBeat() {
      const { data } = await supabase
        .from('beats')
        .select(`
          *,
          producer:profiles(
            id,
            username,
            full_name,
            avatar_url,
            is_verified,
            bio
          )
        `)
        .eq('id', beatId)
        .single()

      setBeat(data)
      setLoading(false)
    }

    if (beatId) {
      fetchBeat()
    }
  }, [beatId])

  return { beat, loading }
}

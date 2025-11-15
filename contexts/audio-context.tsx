'use client'

import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Beat {
  id: string
  title: string
  artist: string
  url: string
  image: string
  duration: number
  price: number
}

interface AudioContextType {
  currentBeat: Beat | null
  isPlaying: boolean
  play: (beat: Beat) => void
  pause: () => void
  resume: () => void
  stop: () => void
  seek: (time: number) => void
  currentTime: number
  volume: number
  setVolume: (vol: number) => void
  queue: Beat[]
  addToQueue: (beat: Beat) => void
  removeFromQueue: (beatId: string) => void
  playNext: () => void
  playPrevious: () => void
  toggleShuffle: () => void
  toggleRepeat: () => void
  isShuffle: boolean
  repeatMode: 'off' | 'one' | 'all'
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [queue, setQueue] = useState<Beat[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off')
  const audioRef = useRef<HTMLAudioElement>(null)
  const supabase = createClient()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0
        audio.play()
      } else if (repeatMode === 'all' || currentIndex < queue.length - 1) {
        playNext()
      } else {
        setIsPlaying(false)
      }
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.volume = volume

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [volume, currentIndex, queue.length, repeatMode])

  const recordPlay = async (beatId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('play_history').insert({
        user_id: user?.id || null,
        beat_id: beatId,
        played_at: new Date().toISOString()
      })

      await supabase.rpc('increment_plays', { beat_id: beatId })
    } catch (error) {
      console.error('Error recording play:', error)
    }
  }

  const play = (beat: Beat) => {
    if (audioRef.current) {
      audioRef.current.src = beat.url
      audioRef.current.play()
      setCurrentBeat(beat)
      setIsPlaying(true)
      setCurrentTime(0)
      recordPlay(beat.id)

      const newQueue = [beat, ...queue.filter(b => b.id !== beat.id)]
      setQueue(newQueue)
      setCurrentIndex(0)
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const resume = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setCurrentTime(0)
      setCurrentBeat(null)
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const addToQueue = (beat: Beat) => {
    setQueue(prev => [...prev, beat])
  }

  const removeFromQueue = (beatId: string) => {
    setQueue(prev => prev.filter(b => b.id !== beatId))
  }

  const playNext = () => {
    if (queue.length === 0) return

    let nextIndex = currentIndex + 1
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length)
    } else if (nextIndex >= queue.length) {
      nextIndex = 0
    }

    setCurrentIndex(nextIndex)
    const nextBeat = queue[nextIndex]
    if (nextBeat) {
      play(nextBeat)
    }
  }

  const playPrevious = () => {
    if (queue.length === 0) return

    let prevIndex = currentIndex - 1
    if (prevIndex < 0) {
      prevIndex = queue.length - 1
    }

    setCurrentIndex(prevIndex)
    const prevBeat = queue[prevIndex]
    if (prevBeat) {
      play(prevBeat)
    }
  }

  const toggleShuffle = () => {
    setIsShuffle(prev => !prev)
  }

  const toggleRepeat = () => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all'
      if (prev === 'all') return 'one'
      return 'off'
    })
  }

  return (
    <AudioContext.Provider value={{
      currentBeat,
      isPlaying,
      play,
      pause,
      resume,
      stop,
      seek,
      currentTime,
      volume,
      setVolume,
      queue,
      addToQueue,
      removeFromQueue,
      playNext,
      playPrevious,
      toggleShuffle,
      toggleRepeat,
      isShuffle,
      repeatMode
    }}>
      <audio ref={audioRef} crossOrigin="anonymous" />
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}

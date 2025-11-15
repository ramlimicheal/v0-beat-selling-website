'use client'

import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

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
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.volume = volume

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [volume])

  const play = (beat: Beat) => {
    if (audioRef.current) {
      audioRef.current.src = beat.url
      audioRef.current.play()
      setCurrentBeat(beat)
      setIsPlaying(true)
      setCurrentTime(0)
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
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  return (
    <AudioContext.Provider value={{ currentBeat, isPlaying, play, pause, resume, stop, seek, currentTime, volume, setVolume }}>
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

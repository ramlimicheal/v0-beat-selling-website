'use client'

import { motion } from 'framer-motion'

export default function AudioVisualizer() {
  const bars = Array.from({ length: 12 })

  return (
    <div className="flex items-end justify-center gap-1.5 h-16">
      {bars.map((_, index) => (
        <motion.div
          key={index}
          initial={{ height: 8 }}
          animate={{ height: [8, 32, 16, 40, 12, 28, 20, 36] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.05,
            ease: 'easeInOut',
          }}
          className="w-1.5 rounded-full gradient-primary"
        />
      ))}
    </div>
  )
}

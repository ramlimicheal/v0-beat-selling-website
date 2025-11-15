'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'signin' | 'signup'
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (error) throw error
      } else {
        if (!username) {
          throw new Error('Username is required')
        }
        const { error } = await signUp(email, password, username)
        if (error) throw error
      }

      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-gradient-to-b from-[#1E1E1E] to-[#121212] rounded-2xl border border-[#2F80ED]/30 shadow-2xl overflow-hidden"
            >
              {/* Animated background */}
              <motion.div
                animate={{
                  background: [
                    'radial-gradient(circle at 0% 0%, rgba(47, 128, 237, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 100%, rgba(39, 174, 96, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 0% 0%, rgba(47, 128, 237, 0.1) 0%, transparent 50%)',
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 pointer-events-none"
              />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-[#B0B0B0] hover:text-white transition z-10"
              >
                <X size={20} />
              </button>

              <div className="relative p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {mode === 'signin' ? 'Welcome Back' : 'Join BeatStars'}
                  </h2>
                  <p className="text-[#B0B0B0]">
                    {mode === 'signin'
                      ? 'Sign in to access your account'
                      : 'Create your account to get started'}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Username
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0B0]" size={18} />
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder-[#707070] focus:outline-none focus:border-[#2F80ED] transition"
                          placeholder="Choose a username"
                          required={mode === 'signup'}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0B0]" size={18} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder-[#707070] focus:outline-none focus:border-[#2F80ED] transition"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0B0]" size={18} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder-[#707070] focus:outline-none focus:border-[#2F80ED] transition"
                        placeholder="••••••••"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-[#2F80ED] to-[#27AE60] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#2F80ED]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                      </>
                    ) : (
                      mode === 'signin' ? 'Sign In' : 'Create Account'
                    )}
                  </motion.button>
                </form>

                {/* Toggle mode */}
                <div className="mt-6 text-center">
                  <p className="text-[#B0B0B0] text-sm">
                    {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => {
                        setMode(mode === 'signin' ? 'signup' : 'signin')
                        setError('')
                      }}
                      className="text-[#2F80ED] hover:text-[#27AE60] font-semibold transition"
                    >
                      {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

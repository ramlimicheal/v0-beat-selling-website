'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import AdvancedMusicPlayer from '@/components/advanced-music-player'
import Footer from '@/components/footer'

interface CartItem {
  id: string
  title: string
  artist: string
  price: number
  image: string
  duration: number
  quantity: number
}

const mockCartItems: CartItem[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Producer One',
    price: 29.99,
    image: '/beat-1.jpg',
    duration: 240,
    quantity: 1
  },
  {
    id: '2',
    title: 'Neon Nights',
    artist: 'Producer Two',
    price: 24.99,
    image: '/beat-2.jpg',
    duration: 180,
    quantity: 1
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [promoCode, setPromoCode] = useState('')

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleRemove = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const handleQuantityChange = (id: string, change: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ))
  }

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
            Continue Shopping
          </motion.button>
        </Link>
      </motion.div>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-gradient-to-b from-purple-900/10 to-blue-900/10 backdrop-blur-xl rounded-2xl border border-purple-500/20"
              >
                <p className="text-gray-400 text-lg mb-4">Your cart is empty</p>
                <Link href="/browse">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold"
                  >
                    Browse Beats
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              cartItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-gradient-to-r from-purple-900/10 to-blue-900/10 backdrop-blur-xl rounded-xl p-4 border border-purple-500/20"
                >
                  <div className="flex gap-4 mb-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.artist}</p>
                      <p className="text-blue-400 font-semibold mt-1">${item.price}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>

                  {/* Mini player */}
                  <AdvancedMusicPlayer
                    track={{
                      id: item.id,
                      title: item.title,
                      artist: item.artist,
                      duration: item.duration
                    }}
                    variant="compact"
                  />

                  {/* Quantity control */}
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-gray-400 text-sm">Quantity:</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="p-1 rounded hover:bg-purple-500/20 transition-colors"
                    >
                      <Minus size={16} className="text-gray-400" />
                    </motion.button>
                    <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="p-1 rounded hover:bg-purple-500/20 transition-colors"
                    >
                      <Plus size={16} className="text-gray-400" />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-b from-purple-900/10 to-blue-900/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 h-fit sticky top-24"
          >
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-purple-500/20">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm"
              />
            </div>

            <div className="flex justify-between text-white text-lg font-bold mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(47, 128, 237, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-lg transition-all"
            >
              Proceed to Checkout
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-3 py-3 rounded-lg border border-purple-500/30 text-gray-300 font-semibold hover:bg-purple-500/10 transition-all"
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ShoppingCart, Bell, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [cartCount] = useState(2)
  const [notifications] = useState(3)

  const navLinks = [
    { label: 'Browse', href: '/browse' },
    { label: 'Sell Beats', href: '/sell' },
    { label: 'For Producers', href: '/producers' }
  ]

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-[#121212]/98 to-[#121212]/80 backdrop-blur-xl border-b border-purple-500/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">BS</span>
            </div>
            <span className="text-white font-bold text-lg hidden sm:inline">BEATSTARS</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center flex-1 justify-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="text-gray-400 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 w-0 group-hover:w-full transition-all duration-300"
                  />
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors text-gray-400 hover:text-white hidden sm:flex"
            >
              <Search size={20} />
            </motion.button>

            {/* Notifications */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors text-gray-400 hover:text-white relative"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                  />
                )}
              </motion.button>
            </motion.div>

            {/* Shopping Cart */}
            <Link href="/cart">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 hover:bg-purple-500/10 rounded-lg transition-colors text-gray-400 hover:text-white cursor-pointer"
              >
                <ShoppingCart size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0, y: -10 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0, y: -10 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>

            {/* User Menu */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors text-gray-400 hover:text-white hidden sm:flex"
            >
              <User size={20} />
            </motion.button>

            {/* Mobile menu */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="pb-4 hidden sm:flex"
            >
              <div className="w-full relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search beats, producers..."
                  className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 flex flex-col gap-4"
            >
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white transition block py-2">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium mt-2"
              >
                Sign In
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

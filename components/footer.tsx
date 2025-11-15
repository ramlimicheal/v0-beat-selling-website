'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const footerLinks = [
    {
      title: 'Product',
      links: ['Browse Beats', 'Sell Beats', 'How It Works', 'Pricing'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Blog', 'Contact', 'Careers'],
    },
    {
      title: 'Legal',
      links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Contact Us'],
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Youtube, href: '#' },
  ]

  return (
    <footer className="border-t border-[#2A2A2A] bg-[#0a0a0a] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">BS</span>
              </div>
              <span className="text-white font-bold">BEATSTARS</span>
            </div>
            <p className="text-[#B0B0B0] text-sm">
              The premier marketplace for buying and selling beats worldwide.
            </p>
          </motion.div>

          {footerLinks.map((column, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-white mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-[#B0B0B0] hover:text-white text-sm transition"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#2A2A2A] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#B0B0B0] text-sm">
            © 2025 BeatStars. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#B0B0B0] hover:text-[#2F80ED] hover:border-[#2F80ED] transition"
                >
                  <Icon size={18} />
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

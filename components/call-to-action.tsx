'use client'

import { motion } from 'framer-motion'

export default function CallToAction() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#2A2A2A]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative gradient-primary p-12 rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#2F80ED] to-[#6E33FF]"></div>
          <div className="absolute inset-0 bg-noise opacity-10"></div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-5 rounded-full"
          ></motion.div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make Your First Beat Sale?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of successful producers earning money from their beats
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-[#2F80ED] rounded-lg font-semibold hover:bg-[#f0f0f0] transition"
              >
                Start Selling Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Browse Beats
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/chat', label: 'Chat' },
    { to: '/image', label: 'Image' },
    { to: '/video', label: 'Video' },
    { to: '/history', label: 'History' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-xl bg-[#080808]/80 border-b border-white/5' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="relative">
                <span className="w-2 h-2 rounded-full bg-[#6366f1] block animate-pulse absolute -top-1 -right-1" />
                <Zap size={20} className="text-[#6366f1]" />
              </span>
              <span className="font-grotesk font-bold text-lg text-white">AI STATION</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === l.to
                      ? 'text-[#6366f1]'
                      : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <Link
                to="/chat"
                className="bg-[#6366f1] hover:bg-[#5558e8] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Launch App
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden text-[#94a3b8] hover:text-white"
              onClick={() => setMenuOpen(v => !v)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#080808]/95 backdrop-blur-xl flex flex-col pt-20 px-6 md:hidden"
          >
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="py-4 text-lg font-medium border-b border-white/5 text-[#94a3b8] hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/chat"
              onClick={() => setMenuOpen(false)}
              className="mt-6 bg-[#6366f1] text-white text-center py-3 rounded-lg font-medium"
            >
              Launch App
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

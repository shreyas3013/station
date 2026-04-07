import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import { getConversations, type Conversation } from '../lib/supabase'

const filters = ['All', 'Claude', 'GPT-4o', 'Gemini', 'Grok', 'Images', 'Videos']

const colorMap: Record<string, string> = {
  Claude: '#6366f1',
  'GPT-4o': '#a855f7',
  Gemini: '#3b82f6',
  Grok: '#22c55e',
  Pollinations: '#ec4899',
  System: '#94a3b8',
}

function getColor(model: string) {
  for (const key of Object.keys(colorMap)) {
    if (model.includes(key)) return colorMap[key]
  }
  return '#94a3b8'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function History() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    getConversations().then(data => setConversations(data as Conversation[]))
  }, [])

  const filtered = conversations.filter(c => {
    const matchSearch = !search || c.user_message.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Images' && c.task_type === 'image') ||
      (activeFilter === 'Videos' && c.task_type === 'video') ||
      c.model_used.includes(activeFilter)
    return matchSearch && matchFilter
  })

  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-grotesk font-bold text-4xl sm:text-5xl text-white mb-10">Conversation History</h1>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full glass-card border border-white/5 pl-10 pr-4 py-3 rounded-xl text-white placeholder-[#94a3b8] text-sm outline-none focus:border-[#6366f1]/40 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeFilter === f
                  ? 'bg-[#6366f1] text-white'
                  : 'glass-card text-[#94a3b8] hover:text-white border border-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="font-grotesk font-bold text-xl text-white mb-2">No conversations yet</h3>
            <p className="text-[#94a3b8] mb-6">Start chatting to see your history here</p>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 bg-[#6366f1] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#5558e8] transition-colors"
            >
              Go to Chat <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((c, i) => {
              const color = getColor(c.model_used)
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200 border border-white/5"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: color + '22', color }}
                      >
                        {c.model_used}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-[#94a3b8]">
                        {c.task_type}
                      </span>
                    </div>
                    <span className="text-[#94a3b8] text-xs">{c.created_at ? formatDate(c.created_at) : ''}</span>
                  </div>
                  <p className="text-white text-sm mb-1 truncate">{c.user_message}</p>
                  <p className="text-[#94a3b8] text-xs truncate">{c.ai_response}</p>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>
    </div>
  )
}

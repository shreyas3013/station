import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Plus, Image as ImageIcon, Video, Globe, Paperclip, Zap, Download, ExternalLink } from 'lucide-react'
import { handleAICall } from '../lib/router'
import { saveConversation, getConversations, type Conversation } from '../lib/supabase'

type Message = {
  id: string
  role: 'user' | 'ai'
  content: string
  type?: 'text' | 'image' | 'video'
  url?: string
  model?: string
  reason?: string
  color?: string
}

const colorMap: Record<string, string> = {
  indigo: '#6366f1',
  purple: '#a855f7',
  blue: '#3b82f6',
  green: '#22c55e',
  pink: '#ec4899',
  orange: '#f97316',
}

function ModelBadge({ model, reason, color }: { model: string; reason: string; color: string }) {
  const c = colorMap[color] || '#6366f1'
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 mb-2"
    >
      <div
        className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border-l-2 font-medium"
        style={{ borderColor: c, background: c + '15', color: c }}
      >
        <Zap size={12} />
        <span>Auto-selected: {model} · {reason}</span>
      </div>
    </motion.div>
  )
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(interval)
      }
    }, 8)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span>
      {displayed}
      {!done && <span className="typewriter-cursor ml-0.5 inline-block w-0.5 h-4 bg-current align-text-bottom" />}
    </span>
  )
}

function LoadingDots() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[#94a3b8] text-xs mb-1">Selecting best model...</p>
      <div className="flex gap-2 items-center">
        <div className="w-2 h-2 rounded-full bg-[#6366f1] dot1" />
        <div className="w-2 h-2 rounded-full bg-[#a855f7] dot2" />
        <div className="w-2 h-2 rounded-full bg-[#6366f1] dot3" />
      </div>
      <p className="text-[#94a3b8] text-xs mt-1">Generating response...</p>
    </div>
  )
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<Conversation[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getConversations().then(data => setHistory(data as Conversation[]))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userText = input.trim()
    setInput('')

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: userText }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const result = await handleAICall(userText)
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        type: result.type,
        content: result.type === 'text' ? result.response : '',
        url: result.type !== 'text' ? result.url : undefined,
        model: result.model,
        reason: result.reason,
        color: result.color,
      }
      setMessages(prev => [...prev, aiMsg])

      await saveConversation({
        user_message: userText,
        ai_response: result.type === 'text' ? result.response : result.url,
        model_used: result.model,
        reason: result.reason,
        task_type: result.type,
      })
      const updated = await getConversations()
      setHistory(updated as Conversation[])
    } catch (err) {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        type: 'text',
        content: 'Something went wrong. Please try again.',
        model: 'System',
        reason: 'Error',
        color: 'indigo',
      }
      setMessages(prev => [...prev, errMsg])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#080808] pt-16">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 border-r border-white/5 flex-col">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <span className="relative">
              <Zap size={18} className="text-[#6366f1]" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
            </span>
            <span className="font-grotesk font-bold text-white text-sm">AI STATION</span>
          </div>
          <button
            onClick={() => setMessages([])}
            className="w-full bg-[#6366f1] hover:bg-[#5558e8] text-white text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} /> New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {history.map((h, i) => (
            <div key={i} className="p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
              <p className="text-white/80 text-xs truncate mb-1">{h.user_message}</p>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: '#6366f122', color: '#6366f1' }}
              >
                {h.model_used}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-white text-xs font-bold">
              U
            </div>
            <span className="text-[#94a3b8] text-sm">User</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="p-4 border-b border-white/5 flex items-center gap-2">
          <span className="text-[#94a3b8] text-sm">Active Model:</span>
          <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-[#6366f122] text-[#6366f1] font-medium">
            <Zap size={11} />
            Smart Auto-Select
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h2 className="font-grotesk font-bold text-2xl text-white mb-2">AI STATION</h2>
              <p className="text-[#94a3b8] text-sm max-w-md">Ask anything — code, writing, images, videos, or real-time info. The right AI picks up automatically.</p>
            </div>
          )}

          <AnimatePresence>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-2xl ${msg.role === 'user' ? 'w-fit' : 'w-full'}`}>
                  {msg.role === 'ai' && msg.model && msg.reason && msg.color && (
                    <ModelBadge model={msg.model} reason={msg.reason} color={msg.color} />
                  )}

                  {msg.role === 'user' ? (
                    <div className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="glass-card rounded-2xl rounded-tl-sm p-4 text-sm text-white/90 leading-relaxed">
                      {msg.type === 'image' && msg.url ? (
                        <div>
                          <img src={msg.url} alt="Generated" className="w-full rounded-xl mb-3" />
                          <a
                            href={msg.url}
                            download
                            className="flex items-center gap-2 text-xs text-[#6366f1] hover:text-[#a855f7] transition-colors"
                          >
                            <Download size={14} /> Download Image
                          </a>
                        </div>
                      ) : msg.type === 'video' && msg.url ? (
                        <div>
                          <div className="text-4xl mb-3">🎬</div>
                          <a
                            href={msg.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-6 py-3 rounded-xl font-medium hover:bg-orange-500/30 transition-colors"
                          >
                            <ExternalLink size={16} /> Open Your Video
                          </a>
                        </div>
                      ) : (
                        <TypewriterText text={msg.content} />
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="glass-card rounded-2xl rounded-tl-sm p-4">
                <LoadingDots />
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-2 glass-card rounded-2xl px-4 py-3 border border-white/8">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask anything — AI STATION picks the right model for you"
              className="flex-1 bg-transparent text-white placeholder-[#94a3b8] text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-[#6366f1] hover:bg-[#5558e8] disabled:opacity-40 text-white p-2 rounded-xl transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="flex items-center gap-3 mt-2 px-1">
            <button className="flex items-center gap-1 text-xs text-[#94a3b8] hover:text-white transition-colors">
              <Paperclip size={13} /> Attach
            </button>
            <Link to="/image" className="flex items-center gap-1 text-xs text-[#94a3b8] hover:text-white transition-colors">
              <ImageIcon size={13} /> Image Mode
            </Link>
            <Link to="/video" className="flex items-center gap-1 text-xs text-[#94a3b8] hover:text-white transition-colors">
              <Video size={13} /> Video Mode
            </Link>
            <button className="flex items-center gap-1 text-xs text-[#94a3b8] hover:text-white transition-colors">
              <Globe size={13} /> Web Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Keyboard, Cpu, Sparkles, Code, Brain, Pen, Zap, Image as ImageIcon, ChevronDown } from 'lucide-react'

const modelCards = [
  {
    icon: Code,
    name: 'Claude Sonnet',
    badge: 'Coding Expert',
    badgeColor: '#6366f1',
    glowClass: 'glow-indigo',
    description: 'Debugging, writing code, explaining technical concepts. Best for Python, JS, HTML, CSS.',
    img: 'https://image.pollinations.ai/prompt/claude%20AI%20coding%20dark%20neon%20cinematic?width=400&height=200&nologo=true',
  },
  {
    icon: Brain,
    name: 'GPT-4o',
    badge: 'Daily Assistant',
    badgeColor: '#a855f7',
    glowClass: 'glow-purple',
    description: 'Reasoning, planning, answering everyday questions. Best for general tasks, math, explanations.',
    img: 'https://image.pollinations.ai/prompt/GPT%20AI%20neural%20network%20dark%20cinematic%20purple?width=400&height=200&nologo=true',
  },
  {
    icon: Pen,
    name: 'Gemini Flash',
    badge: 'Writing Expert',
    badgeColor: '#3b82f6',
    glowClass: 'glow-blue',
    description: 'Creative writing, essays, emails, storytelling. Best for blogs, articles, poems, letters.',
    img: 'https://image.pollinations.ai/prompt/gemini%20AI%20writing%20dark%20blue%20cinematic?width=400&height=200&nologo=true',
  },
  {
    icon: Zap,
    name: 'Grok',
    badge: 'Real-time AI',
    badgeColor: '#22c55e',
    glowClass: 'glow-green',
    description: "Latest news, trending topics, live information. Best for current events, today's updates.",
    img: 'https://image.pollinations.ai/prompt/grok%20AI%20realtime%20dark%20green%20neon%20cinematic?width=400&height=200&nologo=true',
  },
  {
    icon: ImageIcon,
    name: 'Pollinations AI',
    badge: 'Media Generation',
    badgeColor: '#ec4899',
    glowClass: 'glow-pink',
    description: 'Generate stunning images and videos from text. Best for art, illustrations, cinematic video clips.',
    img: 'https://image.pollinations.ai/prompt/pollinations%20AI%20image%20generation%20dark%20pink%20neon?width=400&height=200&nologo=true',
  },
]

const pills = [
  { emoji: '💻', label: 'Coding → Claude Sonnet', float: 'float-1', x: '5%', y: '20%' },
  { emoji: '🧠', label: 'Daily Tasks → GPT-4o', float: 'float-2', x: '75%', y: '15%' },
  { emoji: '✍️', label: 'Writing → Gemini Flash', float: 'float-3', x: '15%', y: '65%' },
  { emoji: '⚡', label: 'Real-time → Grok', float: 'float-4', x: '70%', y: '60%' },
  { emoji: '🎨', label: 'Image & Video → Pollinations', float: 'float-5', x: '40%', y: '80%' },
]

const marqueItems = ['Claude Sonnet', 'GPT-4o', 'Gemini Flash', 'Grok', 'Pollinations', 'Smart Routing', 'Image Generation', 'Video Generation', 'Agentic AI']

export default function Landing() {
  const howRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-[#080808] font-inter">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-16">
        {/* Film grain */}
        <div className="film-grain" />

        {/* Background decoration image */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <img
            src="https://image.pollinations.ai/prompt/futuristic%20dark%20AI%20interface%20cinematic%20purple%20indigo?width=1200&height=600&nologo=true"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating pills */}
        {pills.map((p, i) => (
          <div
            key={i}
            className={`hidden lg:flex absolute items-center gap-2 glass-card px-3 py-2 rounded-full text-sm text-white/80 ${p.float}`}
            style={{ left: p.x, top: p.y }}
          >
            <span>{p.emoji}</span>
            <span className="text-xs font-medium">{p.label}</span>
          </div>
        ))}

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm text-[#94a3b8] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#6366f1] animate-pulse" />
            Powered by Claude · GPT-4o · Gemini · Grok · Pollinations
          </div>

          <h1 className="font-grotesk font-extrabold text-6xl sm:text-7xl md:text-8xl mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
              AI STATION
            </span>
          </h1>

          <p className="font-grotesk text-xl sm:text-2xl text-[#94a3b8] mb-4">
            Every Query. The Right Intelligence.
          </p>

          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            The only platform that automatically routes your request to the perfect AI — Claude for code,
            GPT-4o for daily tasks, Gemini for writing, Grok for real-time info, and Pollinations for images and video.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/chat"
              className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity text-base"
            >
              Launch App
            </Link>
            <button
              onClick={() => howRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="glass-card border border-white/10 text-white font-semibold px-8 py-3.5 rounded-xl hover:border-[#6366f1]/50 transition-colors text-base flex items-center gap-2"
            >
              How it Works <ChevronDown size={16} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden py-6 border-y border-white/5">
        <div className="marquee-track flex whitespace-nowrap">
          {[...marqueItems, ...marqueItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 text-sm text-[#94a3b8]">
              {item}
              <span className="text-[#6366f1]">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <section ref={howRef} className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-grotesk font-bold text-4xl sm:text-5xl text-white mb-4">How it Works</h2>
          <p className="text-[#94a3b8] text-lg">Three steps to intelligent AI responses</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {[
            { num: '01', title: 'You Type Anything', icon: Keyboard, desc: 'Ask a question, paste code, or describe an image' },
            { num: '02', title: 'Intent is Analyzed', icon: Cpu, desc: 'Smart router detects your task type in milliseconds' },
            { num: '03', title: 'Best Model Responds', icon: Sparkles, desc: 'The right AI executes your request with precision' },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card rounded-2xl p-8 glow-indigo hover:-translate-y-1 transition-all duration-300 relative"
            >
              <div className="text-[#6366f1] font-grotesk font-bold text-4xl mb-4 opacity-30">{card.num}</div>
              <card.icon size={28} className="text-[#6366f1] mb-4" />
              <h3 className="font-grotesk font-bold text-xl text-white mb-3">{card.title}</h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed">{card.desc}</p>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 text-[#6366f1] opacity-50 text-xl">· · ·→</div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet Your AI Team */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-grotesk font-bold text-4xl sm:text-5xl text-white mb-4">Meet Your AI Team</h2>
          <p className="text-[#94a3b8] text-lg">Five specialized models, one intelligent platform</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modelCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`glass-card rounded-2xl overflow-hidden ${card.glowClass} hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="relative h-40 overflow-hidden">
                <img src={card.img} alt={card.name} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg" style={{ background: card.badgeColor + '22' }}>
                    <card.icon size={18} style={{ color: card.badgeColor }} />
                  </div>
                  <div>
                    <p className="font-grotesk font-bold text-white text-sm">{card.name}</p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: card.badgeColor + '22', color: card.badgeColor }}
                    >
                      {card.badge}
                    </span>
                  </div>
                </div>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, RefreshCw, Sparkles } from 'lucide-react'

const styles = ['Realistic', 'Cinematic', 'Anime', 'Abstract', '3D', 'Dark Art']

export default function ImageGen() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [usedPrompt, setUsedPrompt] = useState('')

  const generate = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setImageUrl('')
    const fullPrompt = style ? `${prompt} ${style}` : prompt
    setUsedPrompt(fullPrompt)
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=1024&height=1024&nologo=true`
    // Preload image
    const img = new Image()
    img.onload = () => {
      setImageUrl(url)
      setLoading(false)
    }
    img.onerror = () => {
      setImageUrl(url)
      setLoading(false)
    }
    img.src = url
  }

  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="font-grotesk font-bold text-4xl sm:text-5xl text-white">Image Generation</h1>
            <span className="text-xs px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 font-medium">
              Powered by Pollinations AI
            </span>
          </div>
          <p className="text-[#94a3b8]">Free · Unlimited · No API key needed</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Describe your image in detail..."
            rows={4}
            className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Style selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {styles.map(s => (
            <button
              key={s}
              onClick={() => setStyle(style === s ? '' : s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                style === s
                  ? 'bg-[#6366f1] text-white'
                  : 'glass-card text-[#94a3b8] hover:text-white border border-white/5 hover:border-[#6366f1]/30'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold py-4 rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Sparkles size={18} />
          {loading ? 'Generating...' : 'Generate Image'}
        </button>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <div className="shimmer rounded-2xl border-2 border-[#6366f1]/30 aspect-square" style={{ animationDuration: '1.5s' }}>
              <div className="w-full h-full flex items-center justify-center text-[#94a3b8] text-sm">
                ⏳ Generating your image...
              </div>
            </div>
          </motion.div>
        )}

        {imageUrl && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 glass-card rounded-2xl overflow-hidden"
          >
            <img src={imageUrl} alt={usedPrompt} className="w-full" />
            <div className="p-4">
              <p className="text-[#94a3b8] text-xs mb-4 leading-relaxed">"{usedPrompt}"</p>
              <div className="flex gap-3">
                <a
                  href={imageUrl}
                  download="ai-station-image.png"
                  className="flex items-center gap-2 text-sm bg-[#6366f1]/20 text-[#6366f1] border border-[#6366f1]/30 px-4 py-2 rounded-xl hover:bg-[#6366f1]/30 transition-colors"
                >
                  <Download size={14} /> Download
                </a>
                <button
                  onClick={generate}
                  className="flex items-center gap-2 text-sm glass-card border border-white/10 text-[#94a3b8] hover:text-white px-4 py-2 rounded-xl transition-colors"
                >
                  <RefreshCw size={14} /> Regenerate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Sparkles } from 'lucide-react'

export default function VideoGen() {
  const [prompt, setPrompt] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const generate = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setVideoUrl('')
    setProgress(0)

    const url = `https://pollinations.ai/v1/video?prompt=${encodeURIComponent(prompt)}`

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + 2, 90))
    }, 600)

    // Wait 3s to simulate generation
    await new Promise(r => setTimeout(r, 3000))
    clearInterval(interval)
    setProgress(100)
    setVideoUrl(url)
    setLoading(false)
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
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <h1 className="font-grotesk font-bold text-4xl sm:text-5xl text-white">Video Generation</h1>
            <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-medium">
              Powered by Pollinations AI
            </span>
          </div>
          <p className="text-[#94a3b8]">Text to video · Free · No API key needed</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Describe your video scene in detail..."
            rows={4}
            className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm outline-none resize-none leading-relaxed"
          />
        </div>

        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-4 rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Sparkles size={18} />
          {loading ? 'Generating...' : 'Generate Video'}
        </button>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 glass-card rounded-2xl p-6"
          >
            <p className="text-[#94a3b8] text-sm mb-3">🎬 Generating video — this takes 30 to 60 seconds</p>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#6366f1] to-orange-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-[#94a3b8] text-xs mt-2">{progress}%</p>
          </motion.div>
        )}

        {videoUrl && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 glass-card rounded-2xl p-8 text-center"
          >
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="font-grotesk font-bold text-xl text-white mb-2">Your video is ready!</h3>
            <p className="text-[#94a3b8] text-sm mb-6">Click below to watch your generated video</p>
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base"
            >
              <ExternalLink size={18} /> Open Your Video
            </a>
            <p className="text-[#94a3b8] text-xs mt-4">Video opens in a new tab · Right click to save</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

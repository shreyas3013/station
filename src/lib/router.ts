export type TaskMode = 'chat' | 'image' | 'video'

export type DetectedTask = {
  model: string
  reason: string
  color: string
  mode: TaskMode
}

export function detectModel(userInput: string): DetectedTask {
  const input = userInput.toLowerCase()

  const videoKeywords = ['generate video', 'create video', 'make video', 'video of', 'animate', 'clip of', 'make a video']
  if (videoKeywords.some(k => input.includes(k))) {
    return { model: 'Pollinations AI', reason: 'Video generation requested', color: 'orange', mode: 'video' }
  }

  const imageKeywords = ['generate image', 'create image', 'draw', 'picture of', 'illustration', 'make an image', 'image of', 'artwork', 'photo of', 'visualize', 'show me a']
  if (imageKeywords.some(k => input.includes(k))) {
    return { model: 'Pollinations AI', reason: 'Image generation requested', color: 'pink', mode: 'image' }
  }

  const codingKeywords = ['code', 'debug', 'error', 'function', 'script', 'program', 'fix my', 'python', 'javascript', 'html', 'css', 'java', 'bug', 'compile', 'syntax', 'sql', 'git', 'database']
  if (codingKeywords.some(k => input.includes(k))) {
    return { model: 'Claude Sonnet', reason: 'Coding task detected', color: 'indigo', mode: 'chat' }
  }

  const realtimeKeywords = ['latest', 'news', 'today', 'trending', 'current', 'right now', 'this week', 'recently', 'what happened', 'breaking', '2025', '2026', 'live', 'update']
  if (realtimeKeywords.some(k => input.includes(k))) {
    return { model: 'Grok', reason: 'Real-time information query', color: 'green', mode: 'chat' }
  }

  const writingKeywords = ['write', 'essay', 'blog', 'story', 'email', 'letter', 'poem', 'article', 'draft', 'creative writing', 'summarize', 'paragraph', 'content', 'caption', 'describe']
  if (writingKeywords.some(k => input.includes(k))) {
    return { model: 'Gemini Flash', reason: 'Writing task detected', color: 'blue', mode: 'chat' }
  }

  return { model: 'GPT-4o', reason: 'General reasoning task', color: 'purple', mode: 'chat' }
}

declare const puter: any

export type AIResult =
  | { type: 'image'; url: string; model: string; reason: string; color: string }
  | { type: 'video'; url: string; model: string; reason: string; color: string }
  | { type: 'text'; response: string; model: string; reason: string; color: string }

export async function handleAICall(userInput: string): Promise<AIResult> {
  const task = detectModel(userInput)

  if (task.mode === 'image') {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(userInput)}?width=1024&height=1024&nologo=true`
    return { type: 'image', url, model: task.model, reason: task.reason, color: task.color }
  }

  if (task.mode === 'video') {
    const url = `https://pollinations.ai/v1/video?prompt=${encodeURIComponent(userInput)}`
    return { type: 'video', url, model: task.model, reason: task.reason, color: task.color }
  }

  if (task.model === 'Claude Sonnet') {
    const response = await puter.ai.chat(userInput, { model: 'claude-sonnet-4-5', stream: false })
    const text = response.message.content[0].text
    return { type: 'text', response: text, model: task.model, reason: task.reason, color: task.color }
  }

  if (task.model === 'GPT-4o') {
    const response = await puter.ai.chat(userInput, { model: 'gpt-4o', stream: false })
    const text = response.message.content[0].text
    return { type: 'text', response: text, model: task.model, reason: task.reason, color: task.color }
  }

  if (task.model === 'Gemini Flash') {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: userInput }] }] }),
      }
    )
    const data = await res.json()
    const text = data.candidates[0].content.parts[0].text
    return { type: 'text', response: text, model: task.model, reason: task.reason, color: task.color }
  }

  if (task.model === 'Grok') {
    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_GROK_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-2-latest',
        messages: [{ role: 'user', content: userInput }],
      }),
    })
    const data = await res.json()
    const text = data.choices[0].message.content
    return { type: 'text', response: text, model: task.model, reason: task.reason, color: task.color }
  }

  throw new Error('Unknown model')
}

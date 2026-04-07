import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type Conversation = {
  id?: string
  user_message: string
  ai_response: string
  model_used: string
  reason: string
  task_type: string
  created_at?: string
}

export async function saveConversation(conv: Omit<Conversation, 'id' | 'created_at'>) {
  if (!supabase) return
  await supabase.from('conversations').insert(conv)
}

export async function getConversations() {
  if (!supabase) return []
  const { data } = await supabase.from('conversations').select('*').order('created_at', { ascending: false })
  return data || []
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_KEY: string
  readonly VITE_GROK_KEY: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

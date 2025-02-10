export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321'
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
export const WEB_APP_URL = import.meta.env.VITE_WEB_APP_URL || 'http://localhost:3000'

// For renderer process only
export const getRendererConfig = () => ({
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  WEB_APP_URL
})

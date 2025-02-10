// Default values for development
export const DEFAULT_CONFIG = {
  SUPABASE_URL: 'http://localhost:54321',
  SUPABASE_ANON_KEY: 'your-anon-key',
  WEB_APP_URL: 'http://localhost:3000'
}

// Get config value with fallback to default
export function getConfig(key: keyof typeof DEFAULT_CONFIG): string {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[`VITE_${key}`] || DEFAULT_CONFIG[key]
  }
  return DEFAULT_CONFIG[key]
}

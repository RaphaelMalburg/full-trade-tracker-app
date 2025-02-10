import { useEffect, useState } from 'react'
import { AuthService } from '@/lib/supabase'
import { WEB_APP_URL } from '@renderer/config'

export function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const authService = AuthService.getInstance()

  useEffect(() => {
    return () => {
      // Cleanup auth listener when component unmounts
      authService.cleanup()
    }
  }, [])

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await authService.signInWithWeb()
    } catch (err) {
      setError('Failed to sign in. Please try again.')
      console.error('Sign in error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-sm space-y-6 rounded-lg bg-zinc-900 p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Welcome Back</h1>
          <p className="text-sm text-zinc-400">Sign in to access your account</p>
        </div>

        {error && <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400">{error}</div>}

        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign in with Web App'}
        </button>

        <p className="text-center text-sm text-zinc-400">
          Don&apos;t have an account?{' '}
          <a
            href={`${WEB_APP_URL}/sign-up`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Sign up on the web
          </a>
        </p>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { WindowFrame, WindowList } from '@/components'
import { Login } from '@/components/Login'
import { AuthService } from '@/lib/supabase'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const authService = AuthService.getInstance()

  useEffect(() => {
    // Check initial auth state
    setIsAuthenticated(authService.isAuthenticated())

    // Set up auth state listener
    window.context.onAuthData(() => {
      setIsAuthenticated(true)
    })

    return () => {
      authService.cleanup()
    }
  }, [])

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <>
      <WindowList />
    </>
  )
}

export default App

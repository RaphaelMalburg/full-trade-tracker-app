import { createClient } from '@supabase/supabase-js'
import { AuthData } from '@shared/types'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@renderer/config'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export class AuthService {
  private static instance: AuthService
  private authData: AuthData | null = null

  private constructor() {
    console.log('[AuthService] Initializing')
    // Initialize auth listener
    window.context.onAuthData((data) => {
      console.log('[AuthService] Received auth data:', {
        ...data,
        access_token: '***',
        refresh_token: '***'
      })
      this.setAuthData(data)
    })
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  private setAuthData(data: AuthData) {
    console.log('[AuthService] Setting auth data')
    this.authData = data
    supabase.auth
      .setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token
      })
      .then(() => {
        console.log('[AuthService] Supabase session set successfully')
      })
      .catch((error) => {
        console.error('[AuthService] Error setting Supabase session:', error)
      })
  }

  async signInWithWeb(): Promise<void> {
    window.context.openAuthWindow()
  }

  async signOut(): Promise<void> {
    this.authData = null
    await supabase.auth.signOut()
  }

  isAuthenticated(): boolean {
    return !!this.authData
  }

  getUserId(): string | null {
    return this.authData?.user_id || null
  }

  getEmail(): string | null {
    return this.authData?.email || null
  }

  cleanup() {
    window.context.removeAuthListener()
  }
}

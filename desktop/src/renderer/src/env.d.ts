/// <reference types="vite/client" />

import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote, WindowContext } from '@shared/types'

interface Window {
  context: WindowContext
  electron: {
    ipcRenderer: {
      send: (channel: string, ...args: unknown[]) => void
      on: (channel: string, func: (...args: unknown[]) => void) => void
      once: (channel: string, func: (...args: unknown[]) => void) => void
    }
  }
}

interface AuthData {
  access_token: string
  refresh_token: string
  expires_at: string
  user_id: string
  email: string
}

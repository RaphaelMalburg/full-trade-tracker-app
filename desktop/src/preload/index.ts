import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote, AuthData } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'
import { getConfig } from '@shared/config'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
    deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args),
    getWindows: () => ipcRenderer.invoke('get-windows'),
    captureWindow: (sourceId: string) => ipcRenderer.invoke('capture-window', sourceId),
    openAuthWindow: () => {
      console.log('[Preload] Opening auth window')
      const webAppUrl = getConfig('WEB_APP_URL')
      const authUrl = `${webAppUrl}/sign-in?electron=true`
      ipcRenderer.send('open-auth-window', authUrl)
    },
    onAuthData: (callback: (data: AuthData) => void) => {
      console.log('[Preload] Setting up auth data listener')
      ipcRenderer.on('auth-data', (_, data) => {
        console.log('[Preload] Received auth data from main process:', {
          ...data,
          access_token: '***',
          refresh_token: '***'
        })
        callback(data)
      })
    },
    removeAuthListener: () => {
      ipcRenderer.removeAllListeners('auth-data')
    }
  })

  contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
      send: (channel: string, ...args: unknown[]) => {
        const validChannels = ['window-minimize', 'window-maximize', 'window-close']
        if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, ...args)
        }
      }
    }
  })
} catch (error) {
  console.error(error)
}

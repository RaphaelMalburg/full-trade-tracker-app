/// <reference types="vite/client" />

interface Window {
  context: {
    locale: string
    getNotes: (...args: any[]) => Promise<any>
    readNote: (...args: any[]) => Promise<any>
    writeNote: (...args: any[]) => Promise<any>
    createNote: (...args: any[]) => Promise<any>
    deleteNote: (...args: any[]) => Promise<any>
    getWindows: () => Promise<Array<{ id: string; name: string; thumbnail: string }>>
    captureWindow: (sourceId: string) => Promise<{ id: string; name: string; image: string } | null>
  }
  electron: {
    ipcRenderer: {
      send: (channel: string, ...args: unknown[]) => void
      on: (channel: string, func: (...args: unknown[]) => void) => void
      once: (channel: string, func: (...args: unknown[]) => void) => void
    }
  }
}

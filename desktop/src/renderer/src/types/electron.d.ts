interface IElectronAPI {
  ipcRenderer: {
    send: (channel: string, ...args: any[]) => void
    on: (channel: string, func: (...args: any[]) => void) => void
    once: (channel: string, func: (...args: any[]) => void) => void
  }
}

declare global {
  interface Window {
    electron: IElectronAPI
  }
}

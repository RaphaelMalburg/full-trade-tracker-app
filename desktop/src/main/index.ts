import { createNote, deleteNote, getNotes, readNote, writeNote } from '@/lib'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { BrowserWindow, app, desktopCapturer, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

// Disable security warnings
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let mainWindow: BrowserWindow | null = null

// Register custom protocol
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('trade-tracker', process.execPath, [process.argv[1]])
  }
} else {
  app.setAsDefaultProtocolClient('trade-tracker')
}

// Handle open-auth-window IPC event
ipcMain.on('open-auth-window', (_, url: string) => {
  shell.openExternal(url)
})

// Handle custom protocol on Windows
if (process.platform === 'win32') {
  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', (_, commandLine) => {
      console.log('[Protocol] Second instance detected with command line:', commandLine)
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
      // Handle the protocol URL
      const url = commandLine.pop()
      console.log('[Protocol] URL from command line:', url)
      if (url) handleAuthUrl(url)
    })
  }
}

function handleAuthUrl(url: string) {
  try {
    console.log('[Protocol] Handling URL:', url)
    const authUrl = new URL(url)
    console.log('[Protocol] Protocol:', authUrl.protocol)
    console.log('[Protocol] Pathname:', authUrl.pathname)
    console.log('[Protocol] Search params:', Array.from(authUrl.searchParams.keys()))

    if (authUrl.protocol === 'trade-tracker:' && authUrl.pathname === '/auth') {
      const params = Object.fromEntries(authUrl.searchParams.entries())
      console.log('[Protocol] Auth params received:', {
        ...params,
        access_token: '***',
        refresh_token: '***'
      })

      if (!mainWindow) {
        console.error('[Protocol] No main window found')
        return
      }

      mainWindow.webContents.send('auth-data', params)
      console.log('[Protocol] Sent auth data to renderer')
    } else {
      console.log('[Protocol] URL did not match expected format')
    }
  } catch (error) {
    console.error('[Protocol] Error handling URL:', error)
  }
}

// Handle custom protocol on macOS
app.on('open-url', (_, url) => {
  console.log('[Protocol] Received URL via open-url:', url)
  handleAuthUrl(url)
})

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    title: 'NoteMark',
    frame: false,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: false
    }
  })

  // Enable screen capture permissions
  mainWindow.webContents.session.setPermissionRequestHandler((_, permission, callback) => {
    if (permission === 'media' || permission === 'display-capture') {
      callback(true)
    } else {
      callback(false)
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Remove CSP configuration since webSecurity is false
  // and we're handling base64 images
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Set up window control handlers
  ipcMain.on('window-minimize', () => {
    mainWindow?.minimize()
  })

  ipcMain.on('window-maximize', () => {
    if (mainWindow?.isMaximized()) {
      mainWindow?.unmaximize()
    } else {
      mainWindow?.maximize()
    }
  })

  ipcMain.on('window-close', () => {
    mainWindow?.close()
  })

  // Update window listing and screenshot handlers
  ipcMain.handle('get-windows', async () => {
    try {
      const sources = await desktopCapturer.getSources({
        types: ['window'],
        thumbnailSize: { width: 720, height: 480 }
      })

      return sources
        .filter((source) => !source.name.includes('Cursor'))
        .map((source) => ({
          id: source.id,
          name: source.name,
          thumbnail: source.thumbnail.toDataURL()
        }))
    } catch (error) {
      console.error('Error getting sources:', error)
      return []
    }
  })

  ipcMain.handle('capture-window', async (_, sourceId: string) => {
    try {
      const sources = await desktopCapturer.getSources({
        types: ['window'],
        thumbnailSize: { width: 1920, height: 1080 }
      })
      const source = sources.find((s) => s.id === sourceId)
      if (source) {
        return {
          id: source.id,
          name: source.name,
          image: source.thumbnail.toDataURL()
        }
      }
      return null
    } catch (error) {
      console.error('Error capturing window:', error)
      return null
    }
  })

  ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotes>) => getNotes(...args))
  ipcMain.handle('readNote', (_, ...args: Parameters<ReadNote>) => readNote(...args))
  ipcMain.handle('writeNote', (_, ...args: Parameters<WriteNote>) => writeNote(...args))
  ipcMain.handle('createNote', (_, ...args: Parameters<CreateNote>) => createNote(...args))
  ipcMain.handle('deleteNote', (_, ...args: Parameters<DeleteNote>) => deleteNote(...args))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

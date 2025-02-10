'use client'

import { cn } from '@/lib/utils'
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc'

interface WindowFrameProps {
  children: React.ReactNode
  className?: string
}

export function WindowFrame({ children, className }: WindowFrameProps) {
  const handleMinimize = () => {
    if (window.electron) {
      window.electron.ipcRenderer.send('window-minimize')
    }
  }

  const handleMaximize = () => {
    if (window.electron) {
      window.electron.ipcRenderer.send('window-maximize')
    }
  }

  const handleClose = () => {
    if (window.electron) {
      window.electron.ipcRenderer.send('window-close')
    }
  }

  return (
    <div className={cn('flex h-screen w-full flex-col bg-background', className)}>
      {/* Window Title Bar  (keep the style in the div below inline)*/}

      <div
        className="flex h-9 items-center justify-between bg-zinc-950/50 px-3 window-frame-header"
        style={{ WebkitAppRegion: 'drag', userSelect: 'none' } as React.CSSProperties}
      >
        <div className="flex-1 w-full h-full" /> {/* Draggable area */}
        {/* Window Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleMinimize}
            className="inline-flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-zinc-800 hover:text-gray-300"
            aria-label="Minimize"
          >
            <VscChromeMinimize className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleMaximize}
            className="inline-flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-zinc-800 hover:text-gray-300"
            aria-label="Maximize"
          >
            <VscChromeMaximize className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleClose}
            className="inline-flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-red-500/50 hover:text-white"
            aria-label="Close"
          >
            <VscChromeClose className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

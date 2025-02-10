import { useEffect, useState } from 'react'

interface Window {
  id: string
  name: string
  thumbnail: string
}

interface Screenshot {
  id: string
  name: string
  image: string
}

export function WindowList() {
  const [windows, setWindows] = useState<Window[]>([])
  const [selectedWindow, setSelectedWindow] = useState<Screenshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const loadWindows = async () => {
    try {
      setLoading(true)
      setError(null)
      const availableWindows = await window.context.getWindows()
      setWindows(availableWindows)
    } catch (err) {
      setError('Failed to load windows. Please try again.')
      console.error('Error loading windows:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWindows()
  }, [])

  const handleCapture = async (windowId: string) => {
    setSelectedId(windowId)
  }

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center h-full">
        <p className="text-gray-400">Loading available windows...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 flex items-center justify-center h-full">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-4 select-none">
      <div className="flex justify-between items-center mb-4 header">
        <h2 className="text-xl font-semibold text-gray-200">Available Windows</h2>
        <button
          onClick={loadWindows}
          disabled={loading}
          className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {windows.length === 0 ? (
        <p className="text-gray-400">No windows found</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {windows.map((window) => (
            <div
              key={window.id}
              className={`bg-zinc-800/50 rounded-lg p-3 hover:bg-zinc-700/50 transition-colors cursor-pointer group
                ${selectedId === window.id ? 'ring-2 ring-blue-500 bg-zinc-700/50' : ''}`}
              onClick={() => handleCapture(window.id)}
            >
              <div className="relative aspect-video mb-2 overflow-hidden rounded-md bg-zinc-900">
                {window.thumbnail && (
                  <img
                    src={window.thumbnail}
                    alt={window.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Error loading thumbnail:', e)
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}
                <div
                  className={`absolute inset-0 transition-colors pointer-events-none
                  ${
                    selectedId === window.id
                      ? 'bg-blue-500/10'
                      : 'bg-black/20 group-hover:bg-black/10'
                  }`}
                />
              </div>
              <p className="text-sm text-gray-300 truncate">{window.name}</p>
            </div>
          ))}
        </div>
      )}

      {selectedWindow && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-zinc-900/90 rounded-lg p-4 max-w-5xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4 header">
              <h3 className="text-lg font-medium text-gray-200">{selectedWindow.name}</h3>
              <button
                onClick={() => {
                  setSelectedWindow(null)
                  setSelectedId(null)
                }}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
            <div className="relative rounded-lg overflow-hidden bg-zinc-900">
              {selectedWindow.image && (
                <img
                  src={selectedWindow.image}
                  alt={selectedWindow.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    console.error('Error loading image:', e)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

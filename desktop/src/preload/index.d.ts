import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      createNote: CreateNote
      deleteNote: DeleteNote
      onAuthData: (callback: (data: AuthData) => void) => void
      onAuthError: (callback: (error: string) => void) => void
      openAuthWindow: () => void
      removeAuthListener: () => void
    }
  }
}

import { NoteContent, NoteInfo } from './models'

export type GetNotes = () => Promise<NoteInfo[]>
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>
export type CreateNote = () => Promise<NoteInfo['title'] | false>
export type DeleteNote = (title: NoteInfo['title']) => Promise<boolean>

export interface AuthData {
  access_token: string
  refresh_token: string
  expires_at: string
  user_id: string
  email: string
}

export interface WindowContext {
  locale: string
  getNotes: GetNotes
  readNote: ReadNote
  writeNote: WriteNote
  createNote: CreateNote
  deleteNote: DeleteNote
  getWindows: () => Promise<Array<{ id: string; name: string; thumbnail: string }>>
  captureWindow: (sourceId: string) => Promise<{ id: string; name: string; image: string } | null>
  openAuthWindow: () => void
  onAuthData: (callback: (data: AuthData) => void) => void
  removeAuthListener: () => void
}

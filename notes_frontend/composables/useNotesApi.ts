import { ref } from 'vue'

const API_BASE =
  process.env.API_BASE ||
  (typeof window !== 'undefined'
    ? (window as any).API_BASE || 'http://localhost:3001'
    : 'http://localhost:3001')

// PUBLIC_INTERFACE
export function useNotesApi() {
  // PUBLIC_INTERFACE
  async function fetchNotes(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/notes`)
    if (!res.ok) throw new Error('fetch failed')
    return await res.json()
  }

  // PUBLIC_INTERFACE
  async function createNote(data: {
    title: string
    description: string
    name?: string
  }): Promise<any> {
    const res = await fetch(`${API_BASE}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('creation failed')
    return await res.json()
  }

  // PUBLIC_INTERFACE
  async function deleteNote(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/notes/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('delete failed')
  }

  // Extendable for editNote
  return { fetchNotes, createNote, deleteNote }
}

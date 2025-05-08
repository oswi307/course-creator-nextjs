'use client'

import { useEffect, useState } from 'react'

interface Note {
  id: number
  title: string
  content: string
}

export default function NoteClient({ id }: { id: string }) {
  const [note, setNote] = useState<Note | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('my-notes')
    if (!stored) return
    const notes: Note[] = JSON.parse(stored)
    const found = notes.find(n => n.id.toString() === id)
    setNote(found || null)
  }, [id])

  if (!note) return <p>Nota no encontrada</p>

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  )
}

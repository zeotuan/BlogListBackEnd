import React, { useState } from 'react'


const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState('')



  const handleSubmit = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }
    addNote(noteObject)
    setNewNote('')
  }
  return  (
    <form onSubmit={handleSubmit}>
      <input
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button type="submit">save</button>
    </form>
  )
}
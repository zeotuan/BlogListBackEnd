import React, { useState } from 'react'


const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState('')



  const handleSubmit = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: false,
    }
    addNote(noteObject)
    setNewNote('')
  }
  return  (
    <form onSubmit={handleSubmit}>
      <input
        id='noteInput'
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button id='saveNote-button' type="submit">save</button>
    </form>
  )
}

export default NoteForm
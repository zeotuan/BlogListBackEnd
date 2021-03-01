import React, { useState, useEffect, useRef } from 'react'
import Note from './Components/note'
import noteServices from './services/note'
import loginServices from './services/login'
import Notification from './Components/Notification'
import LoginForm from './Components/loginForm'
import NoteForm from './Components/NoteForm'
import Toggable from './Components/Toggable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [user,setUser] = useState(null)

  const noteFormRef = useRef()
  useEffect(() => {
    noteServices.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteServices.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username,password }) => {
    try {
      const response = await loginServices.login({ username,password })
      const user = response.data
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      setUser(user)
      noteServices.setToken(user.token)

    } catch (error) {
      setErrorMessage('Wrong credential')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }


  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteServices.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }


  const toggleImportanceOf = (id) => {
    console.log(id)
    const note = notes.find(n => n.id === id)
    console.log('Note to be changed')
    console.log(note)
    const changedNote = { ...note,important: !note.important }


    noteServices
      .update(id,changedNote)
      .then(returnedNote => {
        console.log('Returned Result')
        console.log(returnedNote)
        setNotes(notes.map(note => note.id !== id? note : returnedNote))
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(
          `the note '${note.content}' was already deleted from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (

    <div>
      {user === null
        ?<Toggable buttonLabel = 'login'>
          <LoginForm handleLogin={handleLogin}/>
        </Toggable>

        :<div>
					 <p>{user.name} logged-in</p>
					 <Toggable buttonLabel = 'new note' ref={noteFormRef}>
					 	<NoteForm addNote ={addNote} />
					 </Toggable>
					 <button onClick={handleLogout}>Logout</button>
				 </div>
      }
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          			show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) =>
          <Note key={i} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>

    </div>
  )
}

export default App
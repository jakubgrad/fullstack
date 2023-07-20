import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'



const App = () => {


  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNumber,
      important: true,
      name: newName,
      number: newNumber
    }

    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

   const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
      noteService
        .update(id, changedNote).then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }

  return (
    <div>
      <h1>Telephone book app</h1>
      <Notification message={errorMessage} />
      <ul>
        <ul>
          {notesToShow.map(note => 
            <Note
              key={note.id}
              name={note.name}
              number={note.number}
            />
          )}
        </ul>
      </ul>
      <form onSubmit={addNote}>
        Name: <input value={newName} onChange={handleNameChange} />
        Number: <input value={newNumber} onChange={handleNumberChange} />
        <button type="submit">save</button>
      </form>
      
    </div>
  )
}

export default App

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

  const delete2 = id => {
    console.log(id)
    noteService
      .delete3(id)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error))
  }

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
      name: newName,
      number: newNumber,
    }
    if ( notesToShow.filter(note => note.name == newName).length != 0) {
      console.log("update");
      let existingNote = notesToShow.filter(note => note.name == newName)
      let id = existingNote[0].id
      console.log(id);
      
      noteService
      .update(id,noteObject)
      .then(returnedNote => {
        setNotes(notes.filter(note => note.name))
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
    } else {

    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const notesToShow = notes

  return (
    <div>
      <h1>Telephone bdook app</h1>
      <button onClick={()=>delete2("adassdwq")}>X</button>
      <ul>
        <ul>
          {notesToShow.map(note => 
          <div>
          <Note
          key={note.id}
          name={note.name}
          number={note.number}
          id={note.id}
          //delete2 = {delete2(note.id)}
          />
            <button onClick={() => delete2(note.id)} type="submit">X</button>
            </div>
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

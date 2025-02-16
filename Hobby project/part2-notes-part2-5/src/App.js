import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('https://en.wiktionary.org/w/api.php?action=query&formatversion=2&prop=revisions&rvprop=content&rvslots=%2A&titles=kuppi&format=json')
      .then(response => {
        setNotes(response.data)
      })
  }, [])

/*
  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }
  
    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(n => n.id !== id ? n : response.data))
    })
  }
  
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
*/
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>


      </div>   

      {
        notes.map(note => 
          <Note 
          //key={note.id} 
          //note={note} 
          //toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}

      {/*<ul>
        notesToShow.map(note => 
          <Note 
          key={note.id} 
          note={note} 
          toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      */}
    </div>
  )
}

export default App
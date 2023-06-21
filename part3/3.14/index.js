const repl = require('repl');
const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const Note = require('./models/note')

app.get('/', (request, response) => {
  response.send('<h1>Hellod World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const note = notes.find(note => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id)
    return note.id === id
  })

  console.log(note)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})


const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  
  const body=request.body
  const note2 = new Note({
    content: body.content,
    important: body.important || false,
  })

  note2.save().then(savedNote => {
    response.json(savedNote)
  })

  if (!request.body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

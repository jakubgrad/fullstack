const repl = require('repl');
const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const Note = require('./models/note')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hellod World!</h1>')
})

app.get('/api/notes', (request, response) => {
  
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  var id = request.params.id;
  Note.findById(id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body
  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = {
    name: body.name,
    number: body.number,
  }

  Note.findByIdAndUpdate(request.params.id, note) //,{ new: true }
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
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
    name: body.name,
    number: body.number,
    //important: body.important || false,
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

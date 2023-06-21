const cors = require('cors')


const repl = require('repl');
const express = require('express');
const { request } = require('http');
const { response } = require('express');
const app = express()
app.use(cors())
app.use(express.json())
var morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
//morgan.token('type', function (req, res) { return req.headers['content-type'] })
	


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hellod World!</h1>')
})

app.get('/api/persons', (request, response) => {
  //console.log(request.headers)
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const person = persons.find(person => {
    //console.log(note.id, typeof note.id, id, typeof id, note.id === id)
    return person.id === id
  })

  //console.log(note)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})


const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.get('/info', (request,response) => {
  number = generateId()-1
  const futureDate = new Date()
  response.send('Phonebook has info for '+number+' people</br>'+ futureDate)
})

const randomId = () => {
  return Math.round(Math.random()*10000)
}

app.post('/api/persons', (request, response) => {
  
  const body=request.body

  if (!request.body) {
    return response.status(400).json({
      error: 'entire body of request missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'Number is missing in the request'
    })
  }

  if (!body.name) {
    return response.status(400).json({
      error: 'Name is missing in the request'
    })
  }

  const duplicate = persons.find(person => person.name === body.name)
  console.log(duplicate)
  console.log(duplicate)
  if (duplicate) {
    return response.status(400).json({
      error: 'The name already exists in the phonebook'
    })
  }

  const person = {
    id: randomId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

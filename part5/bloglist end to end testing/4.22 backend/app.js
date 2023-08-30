const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
//console.log("Config port ", config.PORT);
const notesRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
//const blogsRouter = require('./models/blog')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

//const mongoUrl = 'mongodb://localhost/bloglist'
//const mongoUrl = process.env.MONGODB_URI
//const mongoUrl = 'mongodb+srv://fullstack:merc1234@firstcluster.o20unys.mongodb.net/?retryWrites=true&w=majority'
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

//app.use('/api/blogs', middleware.userExtractor, notesRouter) //even GET would require credentials. userExtractor is directly in POST and DELETE routes.

app.use('/api/blogs', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

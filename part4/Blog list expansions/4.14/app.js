const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
//console.log("Config port ", config.PORT);
const notesRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
//const blogsRouter = require('./models/blog')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

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

app.use('/api/blogs', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})
  
notesRouter.post('/', async (request, response) => {
	body = request.body
	if(!body.hasOwnProperty('title') || !body.hasOwnProperty('url')) {
		response.status(400).send()
	} else {
		const blog = new Blog({...request.body, likes:request.body.likes || 0})
		const savedBlog = await blog.save()   
		response.status(201).json(savedBlog)
	}
})

notesRouter.get('/:id', async (request, response, next) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
  
})

notesRouter.put('/:id', async (request, response, next) => {

  const body = request.body

  const blog = {
	title: body.title,
	author: body.author,
	url: body.url,
	likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

notesRouter.delete('/:id', async (request, response, next) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

module.exports = notesRouter

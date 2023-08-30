const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
	  return authorization.replace('Bearer ', '')
	}
	return null
  }

notesRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	.populate('user', { username: 1, name: 1 })
	response.json(blogs)
})
  
notesRouter.post('/', middleware.userExtractor, async (request, response) => {
	//if (request.token === null) { //doesnt stop execution for tests fsm, instead Bad request 400, but only for tests
	//	//console.log("request.token === null");
	//	return response.status(401).json({ error: '401 Unauthorized' })
	//  }
	const body = request.body
	
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	//const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	if (!decodedToken.id) {
	  return response.status(401).json({ error: '401 Unauthorized' })
	}
	const user = await User.findById(decodedToken.id)
	//const user = await User.findById(body.userId)

	const blog = new Blog({
		title:  body.title,
		author: body.author,
		url: body.url,
		likes:request.body.likes || 0,
		user: user.id
	})
	const savedBlog = await blog.save() 
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	
	response.status(201).json(savedBlog)
	
})

notesRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	//if (request.token === null) {//doesnt stop execution for tests fsm, 400 Bad request instead, but only for tests
	//	//console.log("request.token === null");
	//	return response.status(401).json({ error: '401 Unauthorized' })
	//  }
	const blogId = request.params.id
	//console.log(`request.user:${request.user}`);
	//const body = request.body
	
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	//const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	if (!decodedToken.id) {
	  return response.status(401).json({ error: 'token invalid' })
	}
	
	const user = await User.findById(decodedToken.id)
	const userId = user._id
	//const user = await User.findById(id)
	//const blog = await Blog.findByIdAndDelete(request.params.id) 
	//const user = await User.findById(body.userId)

	/*const blog = new Blog({
		title:  body.title,
		author: body.author,
		url: body.url,
		likes:request.body.likes || 0,
		user: user.id
	})*/
	//const savedBlog = await blog.save() 
	//Blog.findByIdAndDelete(blogId)
	const blog = await Blog.findById(blogId)
	//console.log(blog);
	if ( blog.user.toString() === userId.toString() ) {
		//console.log(`${blog.user.toString()} and ${userId.toString()} are the same!`);
		//console.log("Correct owner");
		await Blog.findByIdAndRemove(request.params.id)
		user.blogs = user.blogs.filter(b => b._id !== blogId)
		await user.save()
		response.status(204).end()
	} else {
		//console.log(`Mismatch between <${blog.user.toString()}> and <${userId.toString()}>`);
		return response.status(401).json({ error: 'Wrong user. Only an owner can delete their posts.' })
	}
	
	
	
	response.status(201)//.json(savedBlog)
	
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

/*notesRouter.delete('/:id', async (request, response, next) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})*/

module.exports = notesRouter

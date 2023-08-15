const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

beforeEach(async () => {
	await User.deleteMany({})
	for (let user of helper.initialUsers) {
		//let userObject = new User(user)
		const passwordHash = await bcrypt.hash('sekret', 10)
		const userObject = new User({ username: user.username, passwordHash })
	
		//await user.save()
		await userObject.save()
	}
	await Blog.deleteMany({})
	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}

})

//4.8: Blog list tests, step1 two tests below
test('all blogs are returned', async () => {
	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

//4.9: Blog list tests, step2 one test below
test('Unique identifier property of the blog posts is named id', async () => {
	const blogsAtStart = await helper.blogsInDb()
	expect(blogsAtStart.map(blog => blog._id)).toBeDefined()
})

//4.10: Blog list tests, step3 the test below
test('a valid blog can be added', async () => {
	
	const usersAtStart = await helper.usersInDb()
	const user = usersAtStart[0]
	const blogsAtStart = await helper.blogsInDb()
	expect(blogsAtStart).toHaveLength(helper.initialBlogs.length )
	expect(usersAtStart.map(user => user._id)).toBeDefined()
	//expect(user).toBe("adsasd")

	const newBlog = {
		"title":"Moucxzczrning",
		"author":"Djzcxcaba",
		"url":"scifistuwqwff",
		"likes":12, 
		"userId":user._id
	}

	const response = await api
	.post('/api/login')
	.send({
		username: user.username,
		password: 'sekret'
	})

	const token = response.body.token
  
	await api
		.post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	
	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
	const titles = blogsAtEnd.map(n => n.title)
	expect(titles).toContain(
		'Moucxzczrning'
	)
})


//4.11*: Blog list tests, step4 one test below //Altered for Blog list expansion
test('if likes property is missing, it defaults to 0', async () => {
	//const newBlog = {"title":"Mourning","author":"Djaba","url":"scifistuff", "userId":"64d63cbb05a24e9de3a2a9d9"}
	const newBlog = {"title":"Mourning","author":"Djaba","url":"scifistuff"}
    
	const usersAtStart = await helper.usersInDb()
	const user = usersAtStart[0]

	expect(usersAtStart.map(user => user._id)).toBeDefined()

	const response = await api
	.post('/api/login')
	.send({
		username: user.username,
		password: 'sekret'
	})

	const token = response.body.token

	await api
		.post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
    
	const blogsAtEnd = await helper.blogsInDb()
	const lastBlog = blogsAtEnd[helper.initialBlogs.length]
	expect(lastBlog.likes).toBe(0)
    
})

//4.12*: Blog list tests, step5 the two tests below
test('blog without title is not added', async () => {
	const newBlog = {"author":"Horse","url":"charger","likes":3}
	//const newBlog = {"title":"Mouse","author":"Horse","url":"charger","likes":3}
  
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
  
	const blogsAtEnd = await helper.blogsInDb()
  
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})
  
test('blog without url is not added', async () => {
	const newBlog = {"title":"Mouse","author":"Horse","likes":3}
    
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
    
	//const response = await api.get('/api/blogs')
	const blogsAtEnd = await helper.blogsInDb()
    
	//expect(response.body).toHaveLength(helper.initialBlogs.length)
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

/*
test('there are two (a correct number) blogs', async () => {
	const blogsAtEnd = await helper.blogsInDb()
  
	expect(blogsAtEnd).toHaveLength(2)
})
*/

test('the first blog has Melboor as the author', async () => {
	const blogsAtEnd = await helper.blogsInDb()
  
	expect(blogsAtEnd[0].author).toBe('Melboor')
})

test('a specific blog can be viewed', async () => {
	const blogsAtStart = await helper.blogsInDb()
  
	const blogToView = blogsAtStart[0]
  
	const resultBlog = await api
		.get(`/api/blogs/${blogToView._id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/)
  
	expect(JSON.stringify(resultBlog.body)).toBe(JSON.stringify(blogToView))
})

//4.13: Blog list expansions, step 1
/*test('a blog can be deleted old test', async () => {
	const usersAtStart = await helper.usersInDb()
	const user = usersAtStart[0]

	expect(usersAtStart.map(user => user._id)).toBeDefined()

	const response = await api
	.post('/api/login')
	.send({
		username: user.username,
		password: 'sekret'
	})
	
	const token = response.body.token

	const blogsAtStart = await helper.blogsInDb()
	const blogToDelete = blogsAtStart[0]
  
	console.log(blogToDelete);
	console.log(blogToDelete._id.toString());

	const blogsToShow = await api
	//.delete(`/api/blogs/${blogToDelete._id}`)
	.get(`/api/blogs/`)
	console.log(blogsToShow.body);
	
	console.log(`token ${token}`);
	console.log(`{blogToDelete._id.toString() ${blogToDelete._id.toString()}`);
	await api
		//.delete(`/api/blogs/${blogToDelete._id}`)
		.delete(`/api/blogs/${blogToDelete._id.toString()}`)
		.set('Authorization', `Bearer ${token}`)
		.expect(204)
  
	const blogsAtEnd = await helper.blogsInDb()
  
	expect(blogsAtEnd).toHaveLength(
		helper.initialBlogs.length - 1
	)
  
	const titles = blogsAtEnd.map(r => r.title)
  
	expect(titles).not.toContain(blogToDelete.title)
})*/

//4.23*: bloglist expansion, step11
test('a blog can be deleted', async () => {
	const usersAtStart = await helper.usersInDb()
	const user = usersAtStart[0]

	expect(usersAtStart.map(user => user._id)).toBeDefined()

	const response = await api
	.post('/api/login')
	.send({
		username: user.username,
		password: 'sekret'
	})
	
	const token = response.body.token

	const blogsAtStart = await helper.blogsInDb()
	const blogToDelete = blogsAtStart[0]
  
	//console.log(blogToDelete);
	//console.log(blogToDelete._id.toString());

	const blogsToShow = await api
	//.delete(`/api/blogs/${blogToDelete._id}`)
	.get(`/api/blogs/`)
	//console.log(blogsToShow.body);
	
	//console.log(`token ${token}`);
	//console.log(`{blogToDelete._id.toString() ${blogToDelete._id.toString()}`);
	
	
	
	const newBlog = {
		"title":"Moucxzczrning",
		"author":"Djzcxcaba",
		"url":"scifistuwqwff",
		"likes":12, 
		"userId":user._id
	}
	await api
		.post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const justAddedBlogs = await helper.blogsInDb()
	const justAddedBlog = justAddedBlogs[2]
	//console.log("just added blogs", justAddedBlogs);
	await api
		//.delete(`/api/blogs/${blogToDelete._id}`)
		.delete(`/api/blogs/${justAddedBlog._id.toString()}`)
		.set('Authorization', `Bearer ${token}`)
		.expect(204)
  
	const blogsAtEnd = await helper.blogsInDb()
  
	expect(blogsAtEnd).toHaveLength(
		justAddedBlogs.length-1
	)
  
	const titles = blogsAtEnd.map(r => r.title)
  
	expect(titles).not.toContain(newBlog.title)
})


//4.14: Blog list expansions, step 2
test('a blog can be modified', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const blogToModify = blogsAtStart[0]
  
	const newBody = {
		title: "RooksBruh",
		author: "DelegationFromFrance",
		url: "mousedcatteddogged.uu",
		likes: 10
	}

	await api
		.put(`/api/blogs/${blogToModify._id}`)
		.send(newBody)
		.expect(200)
  
	const blogsAtEnd = await helper.blogsInDb()
  
	expect(blogsAtEnd[0].title).toBe(newBody.title)
	expect(blogsAtEnd[0].author).toBe(newBody.author)
	expect(blogsAtEnd[0].url).toBe(newBody.url)
	expect(blogsAtEnd[0].likes).toBe(newBody.likes)

	expect(blogsAtEnd).toHaveLength(
		helper.initialBlogs.length
	)
  
	const titles = blogsAtEnd.map(r => r.title)
  
	expect(titles).toContain(newBody.title)
})

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
	  await User.deleteMany({})
  
	  const passwordHash = await bcrypt.hash('sekret', 10)
	  const user = new User({ username: 'root', passwordHash })
  
	  await user.save()
	})
  
	test('creation succeeds with a fresh username', async () => {
	  const usersAtStart = await helper.usersInDb()
  
	  const newUser = {
		username: 'mluukkai',
		name: 'Matti Luukkainen',
		password: 'salainen',
	  }
  
	  await api
		.post('/api/users')
		.send(newUser)
		.expect(201)
		.expect('Content-Type', /application\/json/)
  
	  const usersAtEnd = await helper.usersInDb()
	  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
	  const usernames = usersAtEnd.map(u => u.username)
	  expect(usernames).toContain(newUser.username)
	})

	//4.16*: bloglist expansion, step4
	test('creation doesn t succeed with too short password or username', async () => {
		const usersAtStart = await helper.usersInDb()
	
		const newUser = {
		  username: 'b',
		  name: 'broot',
		  password: 'd',
		}
	
		const result = await api
		  .post('/api/users')
		  .send(newUser)
		  .expect(400)
		  .expect('Content-Type', /application\/json/)
	
		  expect(result.body.error).toContain('Username or password too short')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	
		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).not.toContain(newUser.username)
	  })

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()
	
		const newUser = {
		  username: 'root',
		  name: 'Superuser',
		  password: 'salainen',
		}
	
		const result = await api
		  .post('/api/users')
		  .send(newUser)
		  .expect(400)
		  .expect('Content-Type', /application\/json/)
	
		expect(result.body.error).toContain('expected `username` to be unique')
	
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	  })

  })

afterAll(async () => {
	await mongoose.connection.close()
})



//lots of comments for beforeEach, but only for beforeEach
//beforeEach(async () => {
//	await Blog.deleteMany({})
/*console.log('cleared')
    helper.initialBlogs.forEach(async (blog) => {
        let blogObject = new Blog(blog)
        await blogObject.save()
        console.log('saved')
    })
    console.log('done')
    */
/*
    const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    */
/*
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
        }
    */
/*
	let blogObject = new Blog(helper.initialBlogs[0])
	await blogObject.save()
	blogObject = new Blog(helper.initialBlogs[1])
	await blogObject.save()
    */
/*
  await Note.deleteMany({})

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
    }
    */
//})

/*
test('blog without likes property has 0 likes', async () => {
const newBlog = {"title":"Mouse","author":"Horse","likes":3}

await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

const response = await api.get('/api/blogs')

expect(response.body).toHaveLength(helper.initialBlogs.length)
})
*/
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {"title":"Shining","author":"Melboor","url":"hhtpsomelink","likes":20},
    {"title":"Computers","author":"aComputerPerson","url":"adifferentjswebpage","likes":3}
  ]
  
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })
  
  test('the first blog has Melboor as the author', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].author).toBe('Melboor')
  })

afterAll(async () => {
  await mongoose.connection.close()
})
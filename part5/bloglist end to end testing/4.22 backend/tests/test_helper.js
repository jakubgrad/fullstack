const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
	{
    "username": "Kubas",
    "name": "Grafias",
    "blogs": [ ],
    "id": "64d63cbb05a24e9de3a2a9d9"
    },
    {
    "username": "Kudbas",
    "name": "Grafias",
    "blogs": [ ],
    "id": "64d7c3d9d0dd4fd0ced8f765"
    }
]

const initialBlogs = [
	{"title":"Shining","author":"Melboor","url":"hhtpsomelink","likes":20, "userId":"64d63cbb05a24e9de3a2a9d9"},
	{"title":"Computers","author":"aComputerPerson","url":"adifferentjswebpage","likes":3, "userId":"64d63cbb05a24e9de3a2a9d9"}
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialUsers, initialBlogs, nonExistingId, blogsInDb, usersInDb
}
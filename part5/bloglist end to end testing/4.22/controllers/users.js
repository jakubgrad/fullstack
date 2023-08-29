const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  //validation
  if (username   === undefined || password == undefined) {
    return response.status(400).json({ error: 'Username or password missing' })
  } else if (username.length < 4 || password.length < 4) {
    return response.status(400).json({ error: 'Username or password too short' })
  }
  const users = await User.find({})
  users.map(u => u.username)
  if(users.includes(username)) {
    return response.status(400).json({ error: 'Username not unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
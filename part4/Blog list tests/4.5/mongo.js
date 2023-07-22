const mongoose = require('mongoose')
const Blog = require('./models/blog')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@firstcluster.o20unys.mongodb.net/part4testing?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

if (process.argv.length===3) {
	console.log('View only. Add arguments in the order: title, author, url, likes.')
	Blog.find({}).then(result => {
		result.forEach(note => {
		  console.log(note)
		})
		console.log('... title author url likes. Let the mongo connection close itself.')
		mongoose.connection.close()
	  })
} else {
	console.log('adding ...')
	const blog = new Blog({
		title: process.argv[3],
		author: process.argv[4],
		url: process.argv[5],
		likes: process.argv[6]
	})
	blog.save().then(result => {
		console.log('blog saved!')
		mongoose.connection.close()
	  })
	
}



/*
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/


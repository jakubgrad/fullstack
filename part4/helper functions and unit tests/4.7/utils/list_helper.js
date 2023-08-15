// Load the full build.
var _ = require('lodash')
// Load the core build.
var _ = require('lodash/core')
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp')
var array = require('lodash/array')
var object = require('lodash/fp/object')
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at')
var curryN = require('lodash/fp/curryN')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	if (blogs.length === 0) {
		return 0
	} else {
		//return blogs[0]["likes"]
		return blogs.reduce((p, s) => s['likes'] + p, 0)
	}
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return 0
	} else {
		//return blogs[0]["likes"]
		const mostLikes = blogs.reduce((most, s) => most < s['likes'] ? s['likes'] : most, 0)
		const blog = blogs.find(b => b.likes === mostLikes)
		return {
			title: blog.title, 
			author: blog.author, 
			likes: blog.likes
		}
	}
}

//4.6*: helper functions and unit tests, step4
function mostBlogs(blogs) {
	if (blogs.length == 0) {
		return null
	} else {
		//const maxNumberOfBlogs = Math.max(blogs.map(b => blogs.filter(v => v===b).length))
		//const maxNumberOfBlogs = blogs.map(b => blogs.filter(v => v.author===b.author).length)
		//const maxNumberOfBlogs = Math.max(...blogs.map(b => blogs.filter(v => v.author===b.author).length))
		//O(n), O(n), O(n)!! 
		const occurencesOfAuthors = blogs.map(b => blogs.filter(v => v.author===b.author).length)
		const maxNumberOfBlogs = Math.max(...occurencesOfAuthors)
		const IndexOfBlogOfTheAuthor = occurencesOfAuthors.indexOf(maxNumberOfBlogs)
		const blogOfTheAuthor = blogs[IndexOfBlogOfTheAuthor]

		return {
			author: blogOfTheAuthor.author,
			blogs: maxNumberOfBlogs
		}
	}
}

//4.7*: helper functions and unit tests, step5
function mostLikes(blogs) {
	if (blogs.length == 0) {
		return null
	} else {
		const occurencesOfAuthors = 
                        blogs
                        .map(b => blogs
                        .filter(v => v.author===b.author)
                        .map(u => u.likes)
                        .reduce((accumulator, currentValue) => {
                                return accumulator + currentValue
                              },0))
		const maxNumberOfLikes = Math.max(...occurencesOfAuthors)
		const IndexOfBlogOfTheAuthor = occurencesOfAuthors.indexOf(maxNumberOfLikes)
		const blogOfTheAuthor = blogs[IndexOfBlogOfTheAuthor]

		return {
                        //occurencesOfAuthors: occurencesOfAuthors
			author: blogOfTheAuthor.author,
			likes: maxNumberOfLikes
		}
	}
}
      
  
module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}

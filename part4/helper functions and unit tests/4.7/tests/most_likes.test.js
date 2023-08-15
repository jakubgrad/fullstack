const listHelper = require('../utils/list_helper')


describe('most likes, returns author with largest sum of likes, and their likes.', () => { 
	test('of empty list is null', () => {
		const blogs = []
		const result = listHelper.mostLikes(blogs)
		expect(result).toBe(null)
	}) 
	test('when list has one blog equals the likes of that', () => {
		const blogs = [{
			'_id': '64ba7a50c8aad8952388612a',
			'title': 'sit and look',
			'author': 'Delegation',
			'url': 'mouseandcat.fi',
			'likes': 2,
			'__v': 0
		}]
		const expectedAnswer = {
			'author': 'Delegation',
			'likes': 2
		} 
		const result = listHelper.mostLikes(blogs)
		expect(result).toEqual(expectedAnswer)
	})
	test('of a bigger list returns the author of the most likes', () => {
		const blogs = [
			{
				'_id': '64ba4bd8290f0d617f349840',
				'title': 'Web dev',
				'author': 'Me',
				'url': 'https',
				'likes': 3,
				'__v': 0
			},
			{
				'_id': '34ba7a50c8aad8952388632p',
				'title': 'Notebook coffe',
				'author': 'Delegation',
				'url': 'site.lo',
				'likes': 4,
				'__v': 0
			},
			{
				'_id': '64ba7a2dc8aad89523886128',
				'title': 'How to print print',
				'author': 'He',
				'url': 'thatwebsitedotcom',
				'likes': 20,
				'__v': 0
			},
			{
				'_id': '64ba7a50c8aad8952388612a',
				'title': 'sit and look',
				'author': 'Delegation',
				'url': 'mouseandcat.fi',
				'likes': 2,
				'__v': 0
			},
			{
				'_id': '14ba7a50c8aad8952388632b',
				'title': 'Surfin surfin',
				'author': 'Delegation',
				'url': 'ddweb.au',
				'likes': 4,
				'__v': 0
			}
		]
		const expectedAnswer = {
			'author': 'He',
			'likes': 20
		} 
		const result = listHelper.mostLikes(blogs)
		expect(result).toEqual(expectedAnswer)
	})
})


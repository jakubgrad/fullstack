import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author, but not URL or likes by default', () => {
  const blog = {
    _id: '64db5a66617a080d21e3ed0b',
    title: 'Title straight from the frontend',
    author: 'Your browser',
    url: 'localhost sure thing',
    likes: 0,
    user: {
      username: 'kuba',
      name: 'Kuba',
      id: '64d7d201384f1da05970ff7b'
    },
    __v: 0
  }

  const likeBlog = () => {
    console.log("like!");
  }

  const deleteBlog = () => {
    console.log("delete blog!");
  }

  render(<Blog userReader={blog.user} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />)

  screen.debug()

  //const div = container.querySelector('.blogStyle2')
  //expect(div).toHaveTextContent(
  //  'Title straight from the frontend'
  //)
  const title = screen.getByText('Title straight from the frontend');
  expect(title).toBeDefined();

  const author = screen.getByText('Your browser');
  expect(author).toBeDefined();

  // Likes and URL should not be defined in the initial render
  const likes = screen.queryByText('0'); // Use queryByText to not throw an error if not found
  expect(likes).not.toBeDefined();

  const url = screen.queryByText('localhost sure thing');
  expect(url).not.toBeDefined();
  //expect(element).toBeDefined() //unnecessary
})

// https://facebook.github.io/watchman/ might need to install

test('clicking the button calls event handler once', async () => {
    const blog = {
        _id: '64db5a66617a080d21e3ed0b',
        title: 'Title straight from the frontend',
        author: 'Your browser',
        url: 'localhost sure thing',
        likes: 0,
        user: {
          username: 'kuba',
          name: 'Kuba',
          id: '64d7d201384f1da05970ff7b'
        },
        __v: 0
      }
  
    const likeBlog = () => {
    console.log("like!");
    }

    const deleteBlog = () => {
    console.log("delete blog!");
    }

    const mockHandler = jest.fn()
  
    render(
        <Blog userReader={blog.user} blog={blog} likeBlog={mockHandler} deleteBlog={deleteBlog} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })
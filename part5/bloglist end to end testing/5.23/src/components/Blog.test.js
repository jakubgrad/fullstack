import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('5.15 not sure what is needed', () => {
  let container

  //beforeEach(() => {
    
  //})

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
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

    container = render(
      <Blog userReader={blog.user} blog={blog} likeBlog={mockHandler} deleteBlog={deleteBlog} />
    ).container
    
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})

describe('5.14', () => {
  let container

  beforeEach(() => {
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
    
    container = render(
      <Blog userReader={blog.user} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
    ).container
  })

  test('after clicking the button, url and likes are shown.', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.urlAndLikes')
    expect(div).not.toHaveStyle('display: none')
  })

})

describe('5.13', () => {
  let container

  beforeEach(() => {
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

    container = render(
      <Blog userReader={blog.user} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
    ).container
  })

  test('renders the title', async () => {
    //await screen.findAllByText('Title straight from the frontend')
    const title = screen.getByText('Title straight from the frontend');
  expect(title).toBeDefined();
  })

  test('renders the author', async () => {
    //await screen.findAllByText('Your browser')
    const author = screen.getByText('Your browser');
  expect(author).toBeDefined();
  })

  test('does not render the url or the likes', async () => {
    const div = container.querySelector('.urlAndLikes')
    expect(div).toHaveStyle('display: none')
  })

  //const div = container.querySelector('.blogStyle2')
  //expect(div).toHaveTextContent(
  //  'Title straight from the frontend'
  //)
  /*
  const title = screen.getByText('Title straight from the frontend');
  expect(title).toBeDefined();

  const author = screen.getByText('Your browser');
  expect(author).toBeDefined();

  const div = container.querySelector

  // Likes and URL should not be defined in the initial render
  const likes = screen.queryByText('0'); // Use queryByText to not throw an error if not found
  expect(likes).not.toBeDefined();

  const url = screen.queryByText('localhost sure thing');
  expect(url).not.toBeDefined();
  //expect(element).toBeDefined() //unnecessary
  */
})

// https://facebook.github.io/watchman/ might need to install
/*
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
  })*/
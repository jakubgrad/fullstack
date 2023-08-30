import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('5.16 the form calls the event handler it received as props with the right details when a new blog is created.', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('write blog title here')
  const inputAuthor = screen.getByPlaceholderText('write blog author here')
  const inputUrl = screen.getByPlaceholderText('write blog url here')
  await userEvent.type(inputTitle, 'testing a title...')
  await userEvent.type(inputAuthor, 'testing an author...')
  await userEvent.type(inputUrl, 'testing a url...')
  const sendButton = screen.getByText('save')

  //await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]["title"]).toBe('testing a title...')
  expect(createBlog.mock.calls[0][0]["author"]).toBe('testing an author...')
  expect(createBlog.mock.calls[0][0]["url"]).toBe('testing a url...')
})
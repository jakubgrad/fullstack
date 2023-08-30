import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ /*
                    onSubmit,
                    handleTitleChange, newTitle,
                    handleAuthorChange, newAuthor,
                    handleUrlChange, newUrl
                  */
  createBlog
}) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleTitleChange = ({ target }) => {
    setNewTitle(target.value)
  }

  const handleAuthorChange = ({ target }) => {
    setNewAuthor(target.value)
  }

  const handleUrlChange = ({ target }) => {
    setNewUrl(target.value)
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={(event) => addBlog(event)}>
        <p>Title: <input
          value={newTitle}
          onChange={handleTitleChange}
        /></p>
        <p>Author: <input
          value={newAuthor}
          onChange={handleAuthorChange}
        /></p>
        <p>Url: <input
          value={newUrl}
          onChange={handleUrlChange}
        /></p>

        {/*<input
          value={value}
          onChange={handleChange}
        />*/}
        <button type="submit">save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  //handle: PropTypes.func.isRequired,
  //handleUsernameChange: PropTypes.func.isRequired,
  //handlePasswordChange: PropTypes.func.isRequired,
  //username: PropTypes.string.isRequired,
  //password: PropTypes.string.isRequired
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
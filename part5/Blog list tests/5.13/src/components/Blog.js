import { useState } from 'react'
//import './styles.css';

const Blog = ({ userReader, blog, likeBlog, deleteBlog }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const title = blog.title
  const author= blog.author
  const url = blog.url
  const user = blog.user.username
  const userId = blog.user.username
  const blogId = blog._id
  const blogLikes = blog.likes

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLike = () => {
    const updatedBlog = {
      _id: blogId,
      title: title,
      author: author,
      url: url,
      likes: blogLikes+1,
      user: userId
    }
    likeBlog(blogId, updatedBlog)
    console.log(`blogId: ${blogId}`)
  }

  const removeBlog = () => {
    if(!window.confirm(`Remove blog ${title}`) ) return
    console.log(`userReader is ${userReader}`)
    console.log(userReader)
    console.log(`blogId to remove: ${blogId}`)
    deleteBlog(blogId)
  }

  return (
    <div className='blogStyle2' style={blogStyle}>
      <div>
        {title}
        <button onClick={toggleVisibility} style={hideWhenVisible}>show</button>
        <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
        <button onClick={updateLike}>like</button>
        {userReader.username === user
          ? <button onClick={removeBlog}>remove</button>
          : ''
        }
        {/*<button onClick={removeBlog}>remove</button> */}
      </div>
      <div style={showWhenVisible}>
        <p>{author}</p>
        <p>{url}</p>
        <p>{user}</p>
        <p>{blogLikes}</p>
      </div>
    </div>
  )
}

export default Blog
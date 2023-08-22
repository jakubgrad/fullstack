import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const blogFormRef = useRef()
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
      console.log(blogs); 
  })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      setErrorMessage(null)
      setSuccessMessage("Successfully logged in")
      setTimeout(function(){
        setSuccessMessage(null)
        },5000);

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setSuccessMessage(null)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject);
      setErrorMessage(null)
      setSuccessMessage(`Successfully added ${blogObject.title} to the blog list`)
      setBlogs(blogs.concat({...returnedBlog, user:user}))
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setSuccessMessage(null)
      setErrorMessage(`Couldn't add a new blog. Error: ${error.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const likeBlog = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject);
      setErrorMessage(null)
      setSuccessMessage(`Successfully liked ${blogObject.title}`)
      //setBlogs(blogs.concat({...returnedBlog, user:user})) 
      //could have the likes on the page be changed too using filter and concatenation
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setSuccessMessage(null)
      setErrorMessage(`Couldn't like the blog. Error: ${error.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const deleteBlog = async (id) => {
    //console.log(`Attempt from deleteBlog in App.js to delete ${id}`);
    try {
      const returnedBlog = await blogService.deleteById(id);
      setErrorMessage(null)
      setSuccessMessage(`Successfully deleted ${returnedBlog.title}`)
      //setBlogs(blogs.concat({...returnedBlog, user:user})) 
      //could have the likes on the page be changed too using filter and concatenation
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setSuccessMessage(null)
      setErrorMessage(`Couldn't like the blog. Error: ${error.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  /*
  const handleBlogChange = ({ target }) => {
    setNewBlog(preBlog => target.value)
  }
  */

  const blogForm = () => (
    <div>
        <p>{user.name} logged in</p><button onClick={()=>logout()}>Logout</button>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              createBlog = {addBlog}
              /*
              onSubmit={addBlog}
              handleTitleChange={handleTitleChange}
              newTitle={newTitle}
              handleAuthorChange={handleAuthorChange}
              newAuthor={newAuthor}
              handleUrlChange={handleUrlChange}
              */
            />
          </Togglable>
    </div>
  )

    const logout = () => {
      window.localStorage.clear()
      setUser(null)
      setErrorMessage(null)
      setSuccessMessage(`Successfully logged out`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  
  const compareBlogs = (a,b) => {
    return b.likes - a.likes
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification errorMessage={errorMessage} successMessage={successMessage} />

      {!user && loginForm()} 
      {user && blogForm()
      }

      <div>
      </div>
      {user &&  <ul>
        {blogs.sort(compareBlogs).map((blog, i) => 
          <Blog
            key={i}
            userReader={user}
            blog = {blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
          />
        )}
      </ul>}

      {/*<Footer />*/}
    </div>
  )
}

export default App
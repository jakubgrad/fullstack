import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const create = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('create', content)
        dispatch(createAnecdote(content))
        dispatch(setNotification(content))
        setTimeout(()=>{
            dispatch(removeNotification())
        }, 5000);
      }
return (
    <div>
        <h2>create new</h2>
        <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
        </form>
    </div>
    )
}

export default AnecdoteForm
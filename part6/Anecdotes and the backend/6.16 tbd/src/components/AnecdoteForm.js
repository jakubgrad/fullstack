import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const create = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('create', content)
        
        //const newAnecdote = await anecdoteService.createNew(content)
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
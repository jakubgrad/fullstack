import { voteAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
    
    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        const chosenAnecdote = anecdotes.slice().filter(a => a.id === id)[0]
        //console.log("a", a[0].content)
        dispatch(setNotification(chosenAnecdote.content))
        setTimeout(()=>{
            dispatch(removeNotification())
        }, 5000);
    }


    const compareAnecdotes = (a, b) => {
        return b.votes - a.votes
    }

    const sortedAnecdotes = anecdotes.slice().sort(compareAnecdotes)

    return (
        <div>
        <h2>Anecdotes</h2>
        {filter}
            {filter === 'ALL' 
                ? sortedAnecdotes
                    .map(anecdote =>
                        <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                        </div>
                    )
                : sortedAnecdotes
                .filter(anecdote => anecdote.content.includes(filter))
                .map(anecdote =>
                    <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                    </div>
                )
            }
        </div>
    )
}

export default AnecdoteList
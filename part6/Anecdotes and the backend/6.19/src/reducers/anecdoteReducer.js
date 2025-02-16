import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = {
  anecdotes: [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ],
  filter: 'ALL'
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.anecdotes.map(asObject)

//6.11
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    /*
    createAnecdote(state, action) {
      const content = action.payload
      state.push(action.payload)
    },
    */
    voteAnecdoteUpdate(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange,  
        votes: anecdoteToChange.votes + 1
      }

      console.log(JSON.parse(JSON.stringify(state)))

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )     
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

//export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export const { voteAnecdoteUpdate, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(id)
    dispatch(voteAnecdoteUpdate(id));
    //dispatch(appendAnecdote(newAnecdote))
  } 
}

export default anecdoteSlice.reducer



/*
const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      return state.map(a => 
        a.id === action.payload.id 
        ? {...a, votes:a.votes+1}
        : {...a})
      //return [...state.filter(a => a.id !== action.payload.id), {...state.find(a => a.id === action.payload.id), votes:state.find(a => a.id === action.payload.id).votes+1}]//{...state.filter(a => a.id !== action.payload.id)} //...state.filter(a => a.id === action.payload.id).votes 
    case 'NEW_ANECDOTE':
      return state.concat(action.payload)
    case 'ZERO':
      return 0
    default: // if none of the above matches, code comes here
      return state
  }
}
*/

//6.6 action creators
/*
export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}
*/

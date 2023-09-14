import { configureStore } from '@reduxjs/toolkit'
//import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

//6.10
const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notification: notificationReducer
    }
  })
/*
anecdoteService.getAll().then(notes =>
  store.dispatch(setAnecdotes(notes))
)
*/
export default store
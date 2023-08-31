import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

//6.10
const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer
    }
  })

export default store
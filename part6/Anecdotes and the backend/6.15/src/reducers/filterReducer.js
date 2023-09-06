import { createSlice } from '@reduxjs/toolkit'
/*
const filterReducer = (state = 'ALL', action) => {
    console.log('state now: ', state)
    switch (action.type) {
      case 'SET_FILTER':
        return action.payload
      default:
        return state
    }
  }

// action creator
export const setFilter = (content) => {
    return {
      type: 'SET_FILTER',
      payload: {
        content
      }
    }
  }
*/
const initialState = 'ALL'

//6.10
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      const content = action.payload
      //console.log('content: ', content);
      //console.log('...and state: ', state);
      return content
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer

//export default filterReducer
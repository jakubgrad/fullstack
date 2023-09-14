import { createSlice } from '@reduxjs/toolkit'

const initialState = 'noification content'

//6.11
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationUpdate(state, action) {
        const content = action.payload
        return content
      },
    removeNotification(state, action) {
        return ""
  },
}
})

export const { setNotificationUpdate, removeNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(setNotificationUpdate(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time*1000)
  }
}

export default notificationSlice.reducer


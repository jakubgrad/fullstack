import { createSlice } from '@reduxjs/toolkit'

const initialState = 'noification content'

//6.11
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
        const content = action.payload
        return content
      },
    removeNotification(state, action) {
        return ""
  },
}
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer


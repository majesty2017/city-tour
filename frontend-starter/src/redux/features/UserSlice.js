import {createSlice} from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'users',
  initialState: {
    users: null
  },
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload
    },
  }
})

export default UserSlice.actions

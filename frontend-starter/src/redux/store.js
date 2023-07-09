import {configureStore} from '@reduxjs/toolkit';
import {UserSlice} from './features/UserSlice.js';

const store = configureStore({
  reducer: {
    users: UserSlice.reducer
  }
})

export default store

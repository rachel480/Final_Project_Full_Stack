import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isLoggedIn: false,
  
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
})

export const { setUser} = authSlice.actions

export const selectUser = (state) => state.auth.user
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn

export const selectUserRole = (state) => state.auth.user?.roles || []
export const selectIsAdmin = (state) =>
  state.auth.user?.roles?.includes("Admin")

export default authSlice.reducer
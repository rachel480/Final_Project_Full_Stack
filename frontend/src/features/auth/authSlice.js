import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userProgress: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setUserProgress(state, action) {
      state.userProgress = action.payload;
    }
  },
});

export const { setUser, setUserProgress} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectUserProgress = (state) => state.auth.userProgress;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;

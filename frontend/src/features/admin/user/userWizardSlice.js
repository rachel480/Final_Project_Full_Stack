import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  userInfo: {
    userName: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    roles: "User",
    active: true,
  },
}

const userWizardSlice = createSlice({
  name: "userWizard",
  initialState,
  reducers: {
    goToStep(state, action) {
      state.step = action.payload
    },
    resetWizard() {
      return initialState
    },
    setUserInfo(state, action) {
      state.userInfo = { ...state.userInfo, ...action.payload }
    },
  },
})

export const { goToStep, resetWizard, setUserInfo } = userWizardSlice.actions

export const selectWizardStep = (state) => state.userWizard.step
export const selectWizardData = (state) => state.userWizard

export default userWizardSlice.reducer

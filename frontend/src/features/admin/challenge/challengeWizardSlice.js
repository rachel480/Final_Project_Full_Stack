import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  challengeInfo: {
    questions:[], 
  }
}

const challengeWizardSlice = createSlice({
  name: "challengeWizard",
  initialState,
  reducers: {
    goToStep(state, action) {
      state.step = action.payload
    },

    resetWizard() {
      return initialState
    },

    setChallengeInfo: (state, action) => {
      state.challengeInfo = action.payload
    },

  },
})

export const {goToStep,resetWizard,setChallengeInfo} = challengeWizardSlice.actions

export const selectWizardStep = (state) => state.challengeWizard.step
export const selectWizardData = (state) => state.challengeWizard

export default challengeWizardSlice.reducer
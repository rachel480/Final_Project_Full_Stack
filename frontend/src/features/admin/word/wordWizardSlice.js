import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  wordInfo: {
    word: "",
    translation: "",
    img: null,
    categoryId: ""
  }
}

const wordWizardSlice = createSlice({
  name: "wordWizard",
  initialState,
  reducers: {
    goToStep(state, action) {
      state.step = action.payload;
    },
    setWordInfo(state, action) {
      state.wordInfo = {
        ...state.wordInfo,
        ...action.payload
      }
    },
    resetWizard() {
      return initialState;
    },
  },
})

export const { goToStep, setWordInfo, resetWizard } = wordWizardSlice.actions
export const selectWizardStep = (state) => state.wordWizard.step
export const selectWizardData = (state) => state.wordWizard
export default wordWizardSlice.reducer
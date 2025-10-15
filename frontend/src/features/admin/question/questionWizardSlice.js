// features/question/questionWizardSlice.ts
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  questionInfo: {
    question: null,
    correctAnswer: null,
    options: [],
  },
}

const questionWizardSlice = createSlice({
  name: "questionWizard",
  initialState,
  reducers: {
    goToStep(state, action) {
      state.step = action.payload
    },

    resetWizard() {
      return initialState
    },

    setQuestionInfo: (state, action) => {
      state.questionInfo = action.payload
    },

  },
})

export const {goToStep,resetWizard,setQuestionInfo } = questionWizardSlice.actions

export const selectWizardStep = (state) => state.questionWizard.step
export const selectWizardData = (state) => state.questionWizard
export const selectWizardQuestion = (state) => state.questionWizard.questionInfo

export default questionWizardSlice.reducer
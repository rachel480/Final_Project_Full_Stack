import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  categoryInfo: {
    name: "",
    challenge: null,
    course: null,
    words: []
  },
  challenge: null,
  questions: [],
  words: []
}

const categoryWizardSlice = createSlice({
  name: "categoryWizard",
  initialState,
  reducers: {

    goToStep(state, action) {
      state.step = action.payload
    },

    resetWizard() {
      return initialState
    },

    setWordInfo: (state, action) => {
      state.words.push(action.payload)
    },

    setCategoryInfo: (state, action) => {
      const { name, words } = action.payload

      state.categoryInfo = { ...state.categoryInfo, name: name, words: words }

      state.words = state.words.map((w) =>
        words.includes(w.word ?? w)
          ? { ...w, categoryName: name }
          : w
      )
    },

    setChallengeInfo: (state, action) => {
      state.challenge = action.payload
    },

    setQuestionInfo: (state, action) => {
      state.questions.push(action.payload)
    },

    setCallengeInfoInCategory: (state, action) => {
      state.categories = action.payload
    },

  },
})

export const { goToStep, resetWizard, setWordInfo, setCategoryInfo, setChallengeInfo, setQuestionInfo,setCallengeInfoInCategory} = categoryWizardSlice.actions

export const selectWizardStep = (state) => state.categoryWizard.step
export const selectWizardWords = (state) => state.categoryWizard.words
export const selectWizardCategory = (state) => state.categoryWizard.categoryInfo ? [state.categoryWizard.categoryInfo] : []
export const selectWizardData = (state) => state.categoryWizard

export default categoryWizardSlice.reducer
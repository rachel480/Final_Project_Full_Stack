import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  courseInfo: {
    name: "",
    level: "Easy",
    categories:[]
  },
  categories: [],
  challenges: [],
  questions: [],
  words: []
}

const courseWizardSlice = createSlice({
  name: "courseWizard",
  initialState,
  reducers: {

    goToStep(state, action) {
      state.step = action.payload
    },

    setCourseInfo: (state, action) => {
      state.courseInfo = action.payload
      state.courseInfo={ ...state.courseInfo ,categories:state.categories}
    },

    setCategoryInfo: (state, action) => {
      const { name, words } = action.payload
      const existingIndex = state.categories.findIndex(category => category.name === name)

      if (existingIndex !== -1) {
        state.categories[existingIndex] = { name, words }
      } else {
        state.categories.push({ name, words })
      }

      state.words = state.words.map((w) =>
        words.includes(w.word ?? w)
          ? { ...w, categoryName: name }
          : w
      )
    },

    setWordInfo: (state, action) => {
      state.words.push(action.payload)
    },

    setChallengeInfo: (state, action) => {
      state.challenges.push(action.payload)
    },

    setCallengeInfoInCategory: (state, action) => {
      state.categories = action.payload
    },

    setQuestionInfo: (state, action) => {
      state.questions.push(action.payload)
    },

    resetWizard() {
      return initialState
    },
  },
})

export const { goToStep, resetWizard, setCourseInfo, setCategoryInfo, setChallengeInfo, setWordInfo, setQuestionInfo, setCallengeInfoInCategory } = courseWizardSlice.actions

export const selectWizardStep = (state) => state.courseWizard.step
export const selectWizardCourse = (state) => state.courseWizard.courseInfo
export const selectWizardCategory = (state) => state.courseWizard.categories
export const selectWizardChallenge = (state) => state.courseWizard.challenges
export const selectWizardWords = (state) => state.courseWizard.words
export const selectWizardData = (state) => state.courseWizard

export default courseWizardSlice.reducer
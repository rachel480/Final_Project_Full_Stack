import { combineReducers } from "@reduxjs/toolkit"
import baseApi from "./baseApi"
import authReducer from '../features/auth/authSlice'
import courseWizardReducer from "../features/admin/course/courseWizardSlice"
import categoryWizardReducer from "../features/admin/category/categoryWizardSlice"
import challengeWizardReducer from "../features/admin/challenge/challengeWizardSlice"
import questionWizardReducer from "../features/admin/question/questionWizardSlice"
import wordWizardReducer from "../features/admin/word/wordWizardSlice"
import userWizardReducer from "../features/admin/user/userWizardSlice"

const rootReducer=combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth:authReducer,
    courseWizard:courseWizardReducer,
    categoryWizard:categoryWizardReducer,
    challengeWizard:challengeWizardReducer,
    questionWizard:questionWizardReducer,
    wordWizard:wordWizardReducer,
    userWizard:userWizardReducer
})

export default rootReducer
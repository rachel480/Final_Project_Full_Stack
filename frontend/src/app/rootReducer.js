import { combineReducers } from "@reduxjs/toolkit"
import baseApi from "./baseApi"
import authReducer from '../features/auth/authSlice'
import courseWizardReducer from "../features/admin/course/courseWizardSlice"
import categoryWizardReducer from "../features/admin/category/categoryWizardSlice"
import challengeWizardReducer from "../features/admin/challenge/challengeWizardSlice"
import questionWizardReducer from "../features/admin/question/questionWizardSlice"

const rootReducer=combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth:authReducer,
    courseWizard:courseWizardReducer,
    categoryWizard:categoryWizardReducer,
    challengeWizard:challengeWizardReducer,
    questionWizard:questionWizardReducer
})

export default rootReducer
import { combineReducers } from "@reduxjs/toolkit";
import baseApi from "./baseApi";
import authReducer from '../features/auth/authSlice'
import courseWizardSlice from '../features/admin/course/courseWizardSlice'

const rootReducer=combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth:authReducer,
    courseWizard:courseWizardSlice
})

export default rootReducer
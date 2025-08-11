import { configureStore } from "@reduxjs/toolkit"
import baseApi from "./baseApi"
import rootReducer from "./rootReducer"

const store=configureStore({
reducer:rootReducer,
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export default store

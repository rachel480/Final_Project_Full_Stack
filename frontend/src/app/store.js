import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import baseApi from "./baseApi"
import rootReducer from "./rootReducer"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth","questionWizard","challengeWizard","categoryWizard","courseWizard","wordWizard","userWizard"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(
            { serializableCheck: false, }
        ).concat(baseApi.middleware),
})

export default store
export const persistor = persistStore(store)

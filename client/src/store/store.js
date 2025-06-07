import { combineReducers, configureStore } from '@reduxjs/toolkit'

import storage from "redux-persist/lib/storage"
import { persistReducer}  from "redux-persist"

import userReducer from "./slices/userSlice"
import loaderReducer from "./slices/loaderSlice"

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const combinedReducers = combineReducers({
    user: userReducer,
    loader: loaderReducer,
})
const persistedReducer = persistReducer(persistConfig,combinedReducers)

const store = configureStore({
    reducer: {
       reducer: persistedReducer,
    },
    middleware: () => [],
})

export default store;
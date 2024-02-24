import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {baseApi} from "./apis/baseApi.ts";
import authSlice from "./slices/authSlice.ts";
import storage from "redux-persist/es/storage";
import persistStore from "redux-persist/es/persistStore";
import {persistReducer} from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSlice
})

const persistedReducer = persistReducer({
    key: "root",
    storage,
    whitelist: ["auth"],
}, rootReducer);

export const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            }).concat(baseApi.middleware),
    })
}

export const store = setupStore()
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
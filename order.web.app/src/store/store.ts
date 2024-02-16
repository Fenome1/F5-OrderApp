import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {baseApi} from "./apis/baseApi.ts";
import {authApi} from "./apis/authApi.ts";
import authSlice from "./slices/authSlice.ts";

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({}).concat([authApi.middleware, baseApi.middleware]),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
import {IUser} from "../../features/models/IUser.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IUserState {
    accessToken: string | null
    refreshToken: string | null
    user: IUser | null
}

const initialState: IUserState = {
    accessToken: null,
    refreshToken: null,
    user: null
}

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        logout: () => initialState,
        login: (state, action: PayloadAction<IUserState>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        updateUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    },
});

export const {logout, login, updateUser} = authSlice.actions

export default authSlice.reducer
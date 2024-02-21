import {IAuthCommand} from "../../features/commands/auth/IAuthCommand.ts";
import {login, logout} from "../slices/authSlice.ts";
import {IAuthResponse} from "../../features/models/reasponses/IAuthResponse.ts";
import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {ILogoutCommand} from "../../features/commands/auth/ILogoutCommand.ts";
import {IRefreshCommand} from "../../features/commands/auth/IRefreshCommand.ts";
import {RootState} from "../store.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../fetchBaseQueryWithReauth.ts";

export const authApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<IAuthResponse, IAuthCommand>({
            query: command => ({
                url: `${ApiTags.Auth}/Login`,
                method: HttpMethod.POST,
                body: command,
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    await dispatch(login(data))
                } catch (error) {
                    dispatch(logout())
                    console.log(error)
                }
            }
        }),
        logout: builder.mutation<void, ILogoutCommand>({
            query: command => ({
                url: `${ApiTags.Auth}/Logout`,
                method: HttpMethod.POST,
                body: command,
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                dispatch(logout())
                try {
                    await queryFulfilled
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        refresh: builder.mutation<IAuthResponse, IRefreshCommand>({
            queryFn: async (command, api, extraOptions) => {
                const response = await baseQuery({
                    url: `${ApiTags.User}/refresh`,
                    method: HttpMethod.POST,
                    body: command,
                }, api, extraOptions)

                if (response.data) {
                    const result = response.data as IAuthResponse
                    await api.dispatch(login(result))
                    return {data: result}
                }
                const authState = (api.getState() as RootState).auth;
                await api.dispatch(authApi.endpoints.logout.initiate({
                    accessToken: authState.accessToken,
                    refreshToken: authState.refreshToken
                } as ILogoutCommand))
                return {error: response.error as FetchBaseQueryError}
            },
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRefreshMutation
} = authApi
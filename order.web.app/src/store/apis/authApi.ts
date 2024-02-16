import {IAuthCommand} from "../../features/commands/IAuthCommand.ts";
import {IUser} from "../../features/models/IUser.ts";
import {login, logout} from "../slices/authSlice.ts";
import {IAuthResponse} from "../../features/models/IAuthResponse.ts";
import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";

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
        logout: builder.mutation<IUser, IAuthCommand>({
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
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation
} = authApi
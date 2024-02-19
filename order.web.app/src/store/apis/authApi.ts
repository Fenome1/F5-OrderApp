import {IAuthCommand} from "../../features/commands/IAuthCommand.ts";
import {login, logout} from "../slices/authSlice.ts";
import {IAuthResponse} from "../../features/models/IAuthResponse.ts";
import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {ILogoutCommand} from "../../features/commands/ILogoutCommand.ts";
import {IRefreshCommand} from "../../features/commands/IRefreshCommand";


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
            queryFn: async (command, api) => {
                const response = await baseQuery({
                    url: `${ApiTags.User}/refresh`,
                    method: HttpMethod.POST,
                    body: command,
                }, api)

                if (response.data) {
                    const result = response.data as IAuthorizationResult
                    await api.dispatch(login(result))
                    return {data: result}
                }
                const authState = (api.getState() as AppState).auth;
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
    useRefreshMutatuon
} = authApi
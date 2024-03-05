import {BASE_URL} from "../../config";
import {RootState} from "./store";
import {Mutex} from "async-mutex";
import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {IRefreshCommand} from "../features/commands/auth/IRefreshCommand.ts";
import {authApi} from "./apis/authApi";

export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    mode: "cors",
    prepareHeaders: (headers, {getState}) => {
        const accessToken = (getState() as RootState).auth.accessToken ?? null;
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`)
        }
        return headers
    }
})

/*async function showError(error: FetchBaseQueryError | undefined) {
    if (!error) {
        return;
    }

    let msg = 'Неизвестная ошибка!'

    const {status, data} = error

    if (status && data && (data)) {
        msg = `${(data)}`
    }

    message.error(msg, 3);
}*/

const mutex = new Mutex()

export const fetchQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            const authState = (api.getState() as RootState).auth;

            try {
                const user = authState.user

                if (user) {
                    await api.dispatch(authApi.endpoints.refresh.initiate({
                        accessToken: authState.accessToken,
                        refreshToken: authState.refreshToken
                    } as IRefreshCommand))
                }

                result = await baseQuery(args, api, extraOptions)
            } finally {
                /* await showError(result.error)*/
                await release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    /* await showError(result.error)*/
    return result
}
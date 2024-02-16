import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../../config.ts";
import {RootState} from "../store.ts";

export enum ApiTags {
    Auth = "Auth"
}

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        prepareHeaders: (headers, {getState}) => {
            const accessToken = (getState() as RootState).auth.accessToken ?? null;
            if (accessToken) {
                headers.set("Authorization", `Bearer ${accessToken}`)
            }
            return headers
        }
    }),
    tagTypes: Object.values(ApiTags),
    refetchOnReconnect: true,
    refetchOnFocus: true,
    endpoints: () => ({}),
})


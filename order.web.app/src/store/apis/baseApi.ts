import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchQueryWithReauth} from "../fetchBaseQueryWithReauth";

export enum ApiTags {
    Auth = "Auth"
}

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchQueryWithReauth,
    tagTypes: Object.values(ApiTags),
    refetchOnReconnect: true,
    refetchOnFocus: true,
    keepUnusedDataFor: 0,
    endpoints: () => ({}),
})




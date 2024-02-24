import {ICategory} from "../../features/models/ICategory.ts";
import {ApiTags, baseApi} from "./baseApi.ts";

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => `${ApiTags.Category}`
        }),
    }),
})

export const {
    useGetCategoriesQuery
} = categoryApi
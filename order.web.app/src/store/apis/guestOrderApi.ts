import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {message} from "antd";
import {ICreateGuestOrderCommand} from "../../features/commands/ICreateGuestOrderCommand.ts";
import {IPagedList} from "../../features/models/IPagedList.ts";
import {IGuestOrder} from "../../features/models/IGuestOrder.ts";
import {IPaginationQueryWithFilters} from "../../features/queries/IPaginationQueryWithFilters.ts";
import {buildUrlArguments} from "../../utils/buildUrlArguments.ts";

export const guestOrderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createGuestOrder: builder.mutation<number, ICreateGuestOrderCommand>({
            query: command => ({
                url: `${ApiTags.GuestOrder}/Create`,
                method: HttpMethod.POST,
                body: command
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                await queryFulfilled
                try {
                    await queryFulfilled
                } catch (error) {
                    console.log(error)
                }
                message.success("Заявка успешно отправлена. Скоро с вами свяжется наш менеджер!", 10)
            },
            invalidatesTags: [{type: ApiTags.UserOrder}],
        }),
        getGuestOrders: builder.query<IPagedList<IGuestOrder>, IPaginationQueryWithFilters | void>({
            query: query => ({
                url: `${ApiTags.GuestOrder}/Get/?${buildUrlArguments(query ?? {})}`,
                method: HttpMethod.GET,
            }),
            providesTags: result => [
                ...(result?.items ?? []).map(({guestOrderId}) => ({type: ApiTags.GuestOrder, guestOrderId} as const)),
                {
                    type: ApiTags.GuestOrder,
                    id: 'LIST',
                    page: result?.currentPage
                }
            ]
        }),
    })
})

export const {
    useCreateGuestOrderMutation,
    useGetGuestOrdersQuery
} = guestOrderApi
import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {message} from "antd";
import {ICreateClientOrderCommand} from "../../features/commands/order/ICreateClientOrderCommand.ts";
import {IPagedList} from "../../features/models/IPagedList.ts";
import {IPaginationQueryWithFilters} from "../../features/queries/IPaginationQueryWithFilters.ts";
import {buildUrlArguments} from "../../utils/buildUrlArguments.ts";
import {IOrder} from "../../features/models/IOrder.ts";
import {ICreateGuestOrderCommand} from "../../features/commands/order/ICreateGuestOrderCommand.ts";

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createUserOrder: builder.mutation<number, ICreateClientOrderCommand>({
            query: command => ({
                url: `${ApiTags.Order}/User/Create`,
                method: HttpMethod.POST,
                body: command
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                await queryFulfilled
                try {
                    await queryFulfilled
                    message.success("Заявка успешно отправлена. Скоро с вами свяжется наш менеджер!", 10)
                } catch (error) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    message.error(`Ошибка создания заявки ${error.error?.data}`, 5)
                }
            },
            invalidatesTags: [{type: ApiTags.Order}],
        }),
        createGuestOrder: builder.mutation<number, ICreateGuestOrderCommand>({
            query: command => ({
                url: `${ApiTags.Order}/Guest/Create`,
                method: HttpMethod.POST,
                body: command
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                await queryFulfilled
                try {
                    await queryFulfilled
                    message.success("Заявка успешно отправлена. Скоро с вами свяжется наш менеджер!", 10)
                } catch (error) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    message.error(`Ошибка создания заявки ${error.error?.data}`, 5)
                }
            },
            invalidatesTags: [{type: ApiTags.Order}],
        }),
        getOrders: builder.query<IPagedList<IOrder>, IPaginationQueryWithFilters | void>({
            query: query => ({
                url: `${ApiTags.Order}/Get/?${buildUrlArguments(query ?? {})}`,
                method: HttpMethod.GET,
            }),
            providesTags: result => [
                ...(result?.items ?? []).map(({orderId}) => ({type: ApiTags.Order, orderId} as const)),
                {
                    type: ApiTags.Order,
                    id: 'LIST',
                    page: result?.currentPage
                }
            ]
        }),
        deleteOrder: builder.mutation<void, number>({
            query: (orderId: number) => ({
                url: `${ApiTags.Order}/Delete/${orderId}`,
                method: HttpMethod.DELETE
            }),
            invalidatesTags: [{type: ApiTags.Order}]
        }),
    })
})

export const {
    useCreateUserOrderMutation,
    useCreateGuestOrderMutation,
    useGetOrdersQuery,
    useDeleteOrderMutation
} = orderApi
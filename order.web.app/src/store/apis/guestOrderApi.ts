import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {message} from "antd";
import {ICreateGuestOrderCommand} from "../../features/commands/ICreateGuestOrderCommand.ts";

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
                message.success("Заявка успешно отправлена. Скоро с вами свяжется нас менеджер!", 10)
            },
            invalidatesTags: [{type: ApiTags.UserOrder}],
        }),
    })
})

export const {
    useCreateGuestOrderMutation
} = guestOrderApi
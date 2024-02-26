import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {message} from "antd";
import {ICreateClientOrderCommand} from "../../features/commands/user/ICreateClientOrderCommand.ts";

export const userOrderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createUserOrder: builder.mutation<number, ICreateClientOrderCommand>({
            query: command => ({
                url: `${ApiTags.UserOrder}/Create`,
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
    })
})

export const {
    useCreateUserOrderMutation
} = userOrderApi
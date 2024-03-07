import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {IUserUpdateCommand} from "../../features/commands/user/IUserUpdateCommand.ts";
import {updateUser} from "../slices/authSlice.ts";
import {IUser} from "../../features/models/IUser.ts";
import {message} from "antd";
import {IRegCommand} from "../../features/commands/reg/IRegCommand.ts";

export const userApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        createUser: builder.mutation<number, IRegCommand>({
            query: command => ({
                url: `${ApiTags.User}/Register`,
                method: HttpMethod.POST,
                body: command
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    await queryFulfilled
                    message.success("Вы успешно зарегистрированы!", 2)
                } catch (error) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const errorMessage = error.error?.data || "Произошла ошибка";
                    message.error(errorMessage, 3);
                }
            },
            invalidatesTags: [{type: ApiTags.User}],
        }),
        updateUser: builder.mutation<IUser, IUserUpdateCommand>({
            query: command => ({
                url: `${ApiTags.User}/Update`,
                method: HttpMethod.PUT,
                body: command
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled
                try {
                    await queryFulfilled
                    dispatch(updateUser(data))
                    message.success("Профиль успешно обновлен", 2)
                } catch (error) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const errorMessage = error.error?.data || "Произошла ошибка";
                    message.error(errorMessage, 3);
                }
            },
            invalidatesTags: [{type: ApiTags.User}],
        }),
    })
})

export const {
    useCreateUserMutation,
    useUpdateUserMutation
} = userApi
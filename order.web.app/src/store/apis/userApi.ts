import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {IUserUpdateCommand} from "../../features/commands/user/IUserUpdateCommand.ts";
import {updateUser} from "../slices/authSlice.ts";
import {IUser} from "../../features/models/IUser.ts";
import {message} from "antd";

export const userApi = baseApi.injectEndpoints({
    endpoints: builder => ({
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
                } catch (error) {
                    console.log(error)
                }
                message.success("Профиль успешно обновлен", 2)
            },
            invalidatesTags: [{type: ApiTags.User}],
        }),
    })
})

export const {
    useUpdateUserMutation
} = userApi
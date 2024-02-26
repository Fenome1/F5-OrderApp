import {IUser} from "./IUser.ts";
import {ICategory} from "./ICategory.ts";

export interface IUserOrder {
    clientOrderId: number,
    user: IUser,
    creationDate: Date,
    comment: string,
    category: ICategory
}
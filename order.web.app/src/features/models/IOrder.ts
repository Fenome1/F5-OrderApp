import {IUser} from "./IUser.ts";
import {ICategory} from "./ICategory.ts";
import {IGuest} from "./IGuest.ts";

export interface IOrder {
    orderId: number,
    user: IUser,
    guest: IGuest,
    category: ICategory,
    comment: string,
    creationDate: string
}
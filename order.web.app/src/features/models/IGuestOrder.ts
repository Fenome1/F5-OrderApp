import {IGuest} from "./IGuest.ts";
import {ICategory} from "./ICategory.ts";

export interface IGuestOrder {
    guestOrderId: number,
    guest: IGuest,
    creationDate: string,
    comment: string
    category: ICategory
}
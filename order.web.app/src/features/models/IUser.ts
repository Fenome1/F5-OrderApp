import {IRole} from "./IRole.ts";

export interface IUser {
    userId: number
    email: string
    password: string
    firstName: string
    secondName: string
    middleName: string
    role: IRole
}
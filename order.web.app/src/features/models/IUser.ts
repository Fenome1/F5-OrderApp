import {IRole} from "./IRole.ts";

export interface IUser {
    UserId: number
    login: string
    password: string
    firstName: string
    secondName: string
    middleName: string
    role: IRole
}
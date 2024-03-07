import {Roles} from "../../../common/Roles.ts";

export interface IRegCommand {
    email: string
    password: string
    role: Roles
}
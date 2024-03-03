import {IBaseCreateOrderCommand} from "./IBaseCreateOrderCommand.ts";

export interface ICreateGuestOrderCommand extends IBaseCreateOrderCommand {
    email: string
}
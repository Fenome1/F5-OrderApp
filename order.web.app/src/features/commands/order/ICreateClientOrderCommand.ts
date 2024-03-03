import {IBaseCreateOrderCommand} from "./IBaseCreateOrderCommand.ts";

export interface ICreateClientOrderCommand extends IBaseCreateOrderCommand {
    userId: number,
}
export interface IUserUpdateCommand {
    userId: number,
    login: string | null,
    firstName: string | null,
    secondName: string | null,
    middleName: string | null,
}
export interface IUserUpdateCommand {
    userId: number,
    email: string | null,
    firstName: string | null,
    secondName: string | null,
    middleName: string | null,
}
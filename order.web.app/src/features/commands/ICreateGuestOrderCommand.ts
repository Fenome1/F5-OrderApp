export interface ICreateGuestOrderCommand {
    email: string,
    categoryId: number | undefined,
    comment: string | undefined
}
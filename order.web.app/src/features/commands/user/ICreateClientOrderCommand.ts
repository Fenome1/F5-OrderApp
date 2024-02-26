export interface ICreateClientOrderCommand {
    userId: number,
    categoryId: number | undefined,
    comment: string | undefined
}
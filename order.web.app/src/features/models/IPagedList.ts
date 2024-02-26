export interface IPagedList<T> {
    pageSize: number,
    currentPage: number,
    totalCount: number,
    items: T[]
}
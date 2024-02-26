import {DeletionStatus} from "../../common/DeletionStatus.ts";
import {useState} from "react";
import {IPaginationQueryWithFilters} from "../../features/queries/IPaginationQueryWithFilters.ts";

interface IUsePaginationQuery {
    filter?: DeletionStatus
    pageSize?: number
    page?: number
}

export const usePaginationQuery = (
    {
        filter = DeletionStatus.Available,
        pageSize = 10,
        page = 1
    }: IUsePaginationQuery = {}) => {

    const [paginationQuery, setPaginationQuery] = useState(() => ({
        filter,
        pageSize,
        page
    } as IPaginationQueryWithFilters))

    return [paginationQuery, setPaginationQuery] as const;
}
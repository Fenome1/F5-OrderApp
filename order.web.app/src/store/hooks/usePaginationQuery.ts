import {DeletionStatus} from "../../common/DeletionStatus.ts";
import {useState} from "react";
import {IPaginationQueryWithFilters} from "../../features/queries/IPaginationQueryWithFilters.ts";
import {MembersType} from "../../common/MembersType.ts";

interface IUsePaginationQuery {
    filter?: DeletionStatus
    memberType?: MembersType
    pageSize?: number
    page?: number
    categoryId?: number
    search?: string
}

export const usePaginationQuery = (
    {
        filter = DeletionStatus.Available,
        memberType = MembersType.Client,
        pageSize = 6,
        page = 1,
        categoryId,
        search,
    }: IUsePaginationQuery = {}) => {

    const [paginationQuery, setPaginationQuery] = useState(() => ({
        filter,
        pageSize,
        memberType,
        page,
        categoryId,
        search
    } as IPaginationQueryWithFilters))

    return [paginationQuery, setPaginationQuery] as const;
}
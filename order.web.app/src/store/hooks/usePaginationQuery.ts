import {DeletionStatus} from "../../common/DeletionStatus.ts";
import {useState} from "react";
import {IPaginationQueryWithFilters} from "../../features/queries/IPaginationQueryWithFilters.ts";
import {MembersType} from "../../common/MembersType.ts";

interface IUsePaginationQuery {
    filter?: DeletionStatus
    memberType?: MembersType
    pageSize?: number
    page?: number
}

export const usePaginationQuery = (
    {
        filter = DeletionStatus.Available,
        memberType = MembersType.Client,
        pageSize = 12,
        page = 1
    }: IUsePaginationQuery = {}) => {

    const [paginationQuery, setPaginationQuery] = useState(() => ({
        filter,
        pageSize,
        memberType,
        page
    } as IPaginationQueryWithFilters))

    return [paginationQuery, setPaginationQuery] as const;
}
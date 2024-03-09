import {IPaginationQuery} from "./IPaginationQuery.ts";
import {DeletionStatus} from "../../common/DeletionStatus.ts";
import {MembersType} from "../../common/MembersType.ts";

export interface IPaginationQueryWithFilters extends IPaginationQuery {
    filter?: DeletionStatus
    memberType?: MembersType
    search?: string
    categoryId?: number
}
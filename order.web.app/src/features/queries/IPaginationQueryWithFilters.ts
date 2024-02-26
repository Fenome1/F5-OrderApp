import {IPaginationQuery} from "./IPaginationQuery.ts";
import {DeletionStatus} from "../../common/DeletionStatus.ts";

export interface IPaginationQueryWithFilters extends IPaginationQuery {
    filter?: DeletionStatus
}
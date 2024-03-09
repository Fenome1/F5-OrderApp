import {usePaginationQuery} from "../../../store/hooks/usePaginationQuery.ts";
import {ChangeEvent, FC, useEffect, useState} from 'react';
import {Grid, Pagination} from "@mui/material";
import OrderCard from "./OrderCard.tsx";
import {MembersType} from "../../../common/MembersType.ts";
import {useDeleteOrderMutation, useGetOrdersQuery} from "../../../store/apis/orderApi.ts";
import {message} from "antd";
import LoadingCirc from "../../ui/LoadingCirc.tsx";

interface OrdersContainerProps {
    memberType: MembersType
    categoryId?: number
    search?: string
}

const OrdersContainer: FC<OrdersContainerProps> = ({memberType, categoryId, search}) => {
    const toFirstPage = 1;
    const [page, setPage] = useState(1);
    const [paginationQuery, setPaginationQuery] = usePaginationQuery();

    const {data, isLoading, isError} = useGetOrdersQuery(paginationQuery)
    const [deleteOrder] = useDeleteOrderMutation()

    useEffect(() => {
        setPaginationQuery({...paginationQuery, page: toFirstPage, memberType, search, categoryId});
        setPage(toFirstPage)
    }, [memberType, setPaginationQuery, categoryId, search]);

    const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        setPage(newPage);
        const newPaginationQuery = {...paginationQuery, page: newPage};
        setPaginationQuery(newPaginationQuery);
        console.log(event)
    };

    const handleDeleteOrder = async (orderId: number) => {
        try {
            await deleteOrder(orderId).unwrap();
            message.success("Заказ успешно удален", 3)
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <>
            {isLoading ? <LoadingCirc/> :
                <>
                    {data?.items?.length === 0 || isError ? (
                        <p className='not-found-header'>Заказы не найдены</p>
                    ) : (
                        <Grid container spacing={1}>
                            {data?.items.map(item => (
                                <Grid item xs={12} sm={12} md={4} mb={2} key={item.orderId}>
                                    <OrderCard item={item} onDelete={() => handleDeleteOrder(item.orderId)}/>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    {data?.totalPages && data.totalPages > 1 && (
                        <Pagination
                            className="pagination-bar"
                            count={data?.totalPages}
                            page={page}
                            shape="rounded"
                            boundaryCount={2}
                            onChange={handleChangePage}
                        />
                    )}
                </>
            }
        </>)
};

export default OrdersContainer;
import {usePaginationQuery} from "../../../store/hooks/usePaginationQuery.ts";
import {ChangeEvent, FC, useEffect, useState} from 'react';
import {CircularProgress, Grid, Pagination} from "@mui/material";
import OrderCard from "./OrderCard.tsx";
import {MembersType} from "../../../common/MembersType.ts";
import {useDeleteOrderMutation, useGetOrdersQuery} from "../../../store/apis/orderApi.ts";

interface OrdersContainerProps {
    memberType: MembersType
}

const OrdersContainer: FC<OrdersContainerProps> = ({memberType}) => {
    const [page, setPage] = useState(1);
    const [paginationQuery, setPaginationQuery] = usePaginationQuery();
    const {data, isLoading} = useGetOrdersQuery(paginationQuery)
    const [deleteOrder] = useDeleteOrderMutation()
    const toFirstPage = 1;

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
            /*refetch();*/
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    useEffect(() => {
        setPage(toFirstPage)
        setPaginationQuery({...paginationQuery, memberType, page: toFirstPage});
    }, [memberType, setPaginationQuery]);

    return (

        <>
            {isLoading ? (
                <CircularProgress/>
            ) : (
                <>
                    <Grid container spacing={1}>
                        {data?.items.map(item => (
                            <Grid item xs={12} sm={12} md={4} mb={2} key={item.orderId}>
                                <OrderCard item={item} onDelete={() => handleDeleteOrder(item.orderId)}/>
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        className="pagination-bar"
                        count={data?.totalPages}
                        page={page}
                        shape="rounded"
                        boundaryCount={2}
                        onChange={handleChangePage}
                    />
                </>
            )}
        </>
    );
};

export default OrdersContainer;
import {useGetGuestOrdersQuery} from "../../../store/apis/guestOrderApi.ts";
import {Box, Card, CardContent, CardHeader, Grid, Pagination, Typography} from "@mui/material";
import {Divider} from "antd";
import {Colors} from "../../../common/Colors.ts";
import {SyntheticEvent, useState} from "react";
import {usePaginationQuery} from "../../../store/hooks/usePaginationQuery.ts";

const GuestOrders = () => {
    const [paginationQuery, setPaginationQuery] = usePaginationQuery()
    const {data} = useGetGuestOrdersQuery(paginationQuery)
    const [page, setPage] = useState(1);
    const handleChangePage = (event: SyntheticEvent, newPage: number) => {
        setPage(newPage)
        const newPaginationQuery = {...paginationQuery};
        newPaginationQuery.page = newPage;
        setPaginationQuery(newPaginationQuery);
        window.scrollTo({top: 0, behavior: "smooth"});
    };
    return (
        <>
            <Grid container spacing={1}>
                {data?.items.map((item) => (
                    <Grid item xs={12} sm={12} md={4} mb={2} key={item.guestOrderId}>
                        <Card className='guest-card' sx={{filter: `drop-shadow(0 0 0.1rem ${Colors.Fourthly})`}}>
                            <CardHeader title={item.category.title} className='guest-card-title'/>
                            <CardContent className='guest-card-content'>
                                <Divider/>
                                <Typography className='guest-card-comment' variant="body1"
                                            color={`${Colors.Fourthly}`}>
                                    {item.comment}
                                </Typography>
                                <Box className='guest-card-futter'>
                                    <Typography variant="body2">
                                        {item.guest.email}
                                    </Typography>
                                    <Typography variant="body2">
                                        {item.creationDate}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                className='guest-pagination-bar'
                count={data?.totalPages}
                page={page}
                shape="rounded"
                boundaryCount={2}
                onChange={handleChangePage}
            />
        </>);
};

export default GuestOrders;
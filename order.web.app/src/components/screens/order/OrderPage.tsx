import Nav from "../../ui/nav/Nav.tsx";
import Futter from "../../ui/Futter.tsx";
import {Box} from "@mui/material";

const OrderPage = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: "100vh"
        }}>
            <Nav/>
            <div>qwe</div>
            <Futter/>
        </Box>
    );
};

export default OrderPage;
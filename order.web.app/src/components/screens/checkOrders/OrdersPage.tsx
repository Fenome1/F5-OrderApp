import DefaultPage from "../../ui/DefaultPage.tsx";
import {Box, List, ListItemButton, ListItemIcon, ListItemText,} from "@mui/material";
import './style.scss'
import PeopleIcon from '@mui/icons-material/People';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import {useState} from "react";
import {Colors} from "../../../common/Colors.ts";
import ClientsOrders from "./ClientsOrders.tsx";
import GuestOrders from "./GuestOrders.tsx";

const OrdersPage = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return (
        <DefaultPage>
            <Box className='order-page-content'>
                <Box className='menu' sx={{border: `${Colors.Secondary} solid 2px`}}>
                    <h1>Заказы</h1>
                    <List className='nav-list'>
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={() => handleListItemClick(0)}>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Клиенты"/>
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={() => handleListItemClick(1)}>
                            <ListItemIcon>
                                <PersonOffIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Гости"/>
                        </ListItemButton>
                    </List>
                </Box>
                <Box className='orders-content'>
                    {selectedIndex === 0 ?
                        <ClientsOrders/>
                        :
                        <GuestOrders/>
                    }
                </Box>
            </Box>
        </DefaultPage>
    );
};

export default OrdersPage;
import DefaultPage from "../../ui/DefaultPage.tsx";
import {Box, List, ListItemButton, ListItemIcon, ListItemText,} from "@mui/material";
import './style.scss'
import PeopleIcon from '@mui/icons-material/People';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import {useState} from "react";
import {Colors} from "../../../common/Colors.ts";
import {MembersType} from "../../../common/MembersType.ts";
import OrdersContainer from "./OrdersContainer.tsx";

const OrdersPage = () => {
    const [selectedMemberType, setSelectedMemberType] = useState(MembersType.Client);

    const handleListItemClick = (
        index: number,
    ) => {
        setSelectedMemberType(index);
    };

    return (
        <DefaultPage>
            <Box className='order-page-content'>
                <Box className='menu' sx={{border: `${Colors.Secondary} solid 2px`}}>
                    <h1>Заказы</h1>
                    <List className='nav-list'>
                        <ListItemButton
                            selected={selectedMemberType === MembersType.Client}
                            onClick={() => handleListItemClick(MembersType.Client)}>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Клиенты"/>
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedMemberType === MembersType.Guest}
                            onClick={() => handleListItemClick(MembersType.Guest)}>
                            <ListItemIcon>
                                <PersonOffIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Гости"/>
                        </ListItemButton>
                    </List>
                </Box>
                <Box className='orders-content'>
                    <OrdersContainer memberType={selectedMemberType}/>
                </Box>
            </Box>
        </DefaultPage>
    );
};

export default OrdersPage;
import DefaultPage from "../../ui/DefaultPage.tsx";
import {Autocomplete, Box, List, ListItemButton, ListItemIcon, ListItemText, Stack, TextField,} from "@mui/material";
import './style.scss'
import PeopleIcon from '@mui/icons-material/People';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import {useState} from "react";
import {Colors} from "../../../common/Colors.ts";
import {MembersType} from "../../../common/MembersType.ts";
import OrdersContainer from "./OrdersContainer.tsx";
import {useGetCategoriesQuery} from "../../../store/apis/categoryApi.ts";
import {ICategory} from "../../../features/models/ICategory.ts";

const OrdersPage = () => {
        const {data: categories, isLoading} = useGetCategoriesQuery();

        const [selectedMemberType, setSelectedMemberType] = useState(MembersType.Client);
        const [selectedCategory, setCategory] = useState<ICategory | null>(null);
        const [search, setSearch] = useState("")

        const handleListItemClick = (index: number) => {
            setSelectedMemberType(index);
        };

        return (
            <DefaultPage>
                <Box className='order-page-content' display="flex" gap={2}>
                    <Box className='menu' sx={{border: `${Colors.Secondary} solid 2px`, padding: '10px'}}>
                        <h1>Заказы</h1>
                        <List className='nav-list' sx={{marginBottom: '10px'}}>
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
                        <Stack>
                            <Autocomplete
                                disablePortal
                                loading={isLoading}
                                sx={{
                                    width: '300px',
                                    transition: "all 0.2s .01s",
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10",
                                        padding: "10"
                                    },
                                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                        border: `2px solid ${Colors.Thirdly}`,
                                    },
                                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: Colors.Secondary
                                        },
                                }}
                                options={categories || []}
                                getOptionLabel={(option) => option.title}
                                onChange={(event: any, newValue: ICategory | null) => {
                                    console.log("Event:", event);
                                    setCategory(newValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Категория"/>}/>
                        </Stack>
                    </Box>
                    <Box className='orders-content' flexGrow={1}>
                        <TextField sx={{
                            marginBottom: '10px', marginRight: '5px', marginLeft: '5px',
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": {
                                    borderColor: Colors.Secondary,
                                }
                            }
                        }} label='Поиск...'
                                   InputProps={{
                                       style: {
                                           color: Colors.Fourthly,
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           color: Colors.Fourthly
                                       }
                                   }}
                                   onChange={(data) => setSearch(data.target.value)}></TextField>
                        <OrdersContainer
                            memberType={selectedMemberType}
                            search={search}
                            categoryId={selectedCategory?.categoryId}/>
                    </Box>
                </Box>
            </DefaultPage>
        );
    }
;

export default OrdersPage;
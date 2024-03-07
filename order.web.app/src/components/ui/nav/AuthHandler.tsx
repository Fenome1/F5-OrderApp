import React, {FC, useState} from 'react';
import {Box, Button, CircularProgress, IconButton, Menu, MenuItem} from "@mui/material";
import {Colors} from "../../../common/Colors.ts";
import {AccountCircle} from "@mui/icons-material";
import {useLogoutMutation} from "../../../store/apis/authApi.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {IUser} from "../../../features/models/IUser.ts";

interface ILoginCheckerProps {
    user: IUser | null,
    accessToken: string,
    refreshToken: string,
    sx: any
}

const AuthHandler: FC<ILoginCheckerProps> = (props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [logout, {isLoading}] = useLogoutMutation();

    const location = useLocation()
    const navigate = useNavigate()
    const toAuth = () => navigate("/auth")
    const toProfile = () => navigate("/profile")
    const toDuties = () => navigate('/duties')
    const toReg = () => navigate('/reg')

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const getLogout = async () => {
        await logout({
            accessToken: props.accessToken,
            refreshToken: props.refreshToken
        })
        handleClose()
        toDuties()
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={props.sx}>
            {isLoading && <CircularProgress/>}
            {!isLoading &&
            props.user ?
                <div>
                    <IconButton
                        size='large'
                        onClick={handleMenu}
                        sx={
                            {
                                color: Colors.Primary
                            }
                        }>
                        <AccountCircle/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <MenuItem onClick={toProfile}>Профиль</MenuItem>
                        <MenuItem onClick={getLogout}>Выход</MenuItem>
                    </Menu>
                </div>
                :
                <>
                    {(location.pathname !== '/auth' && location.pathname !== '/reg') &&
                        <>
                            <Button variant='outlined' color="inherit" onClick={toAuth}
                                    style={{marginRight: "10px"}}>Войти</Button>
                            <Button variant='outlined' color="inherit" onClick={toReg}>Регистрация</Button>
                        </>}
                </>
            }
        </Box>
    );
};

export default AuthHandler;
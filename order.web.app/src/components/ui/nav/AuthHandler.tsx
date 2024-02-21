import React, {FC, useState} from 'react';
import {Box, Button, CircularProgress, IconButton, Menu, MenuItem} from "@mui/material";
import {Colors} from "../../../common/Colors.ts";
import {AccountCircle} from "@mui/icons-material";
import {useLogoutMutation} from "../../../store/apis/authApi.ts";
import {useNavigate} from "react-router-dom";
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

    const navigate = useNavigate()
    const toAuth = () => navigate("/auth")
    const toProfile = () => navigate("/profile")

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const getLogout = async () => {
        await logout({
            accessToken: props.accessToken,
            refreshToken: props.refreshToken
        })
        handleClose()
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
                <Button variant='outlined' color="inherit" onClick={toAuth}>Войти</Button>
            }
        </Box>
    );
};

export default AuthHandler;
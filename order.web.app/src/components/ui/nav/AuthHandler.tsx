import React, {FC, useState} from 'react';
import {IUser} from "../../../features/models/IUser.ts";
import {Box, Button, IconButton, Menu, MenuItem} from "@mui/material";
import {Colors} from "../../../common/Colors.ts";
import {AccountCircle} from "@mui/icons-material";
import {useLogoutMutation} from "../../../store/apis/authApi.ts";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";

interface ILoginCheckerProps {
    user: IUser | null
    sx: styled
}

const AuthHandler: FC<ILoginCheckerProps> = (props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [logout] = useLogoutMutation();

    const navigate = useNavigate()
    const toAuth = () => navigate("/auth")

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const getLogout = async () => {
        await logout()
        handleClose()
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={props.sx}>
            {props.user ?
                <div>
                    <IconButton
                        size='lagre'
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
                        <MenuItem onClick={handleClose}>Профиль</MenuItem>
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
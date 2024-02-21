import {AppBar, Box, Button, Toolbar} from "@mui/material";
import {useTypedSelector} from "../../../store/hooks/hooks.ts";
import {Colors} from "../../../common/Colors.ts";
import AuthHandler from "./AuthHandler.tsx";
import {useLocation, useNavigate} from "react-router-dom";

const Nav = () => {
    const {user, accessToken, refreshToken} = useTypedSelector(state => state.auth)
    const navigate = useNavigate();
    const location = useLocation()

    const toOrder = () => navigate("/order")
    const toDuties = () => navigate("/duties")

    return (
        <AppBar position='sticky'
                sx={{
                    backgroundColor: Colors.Secondary,
                }}
                style={{
                    height: '103px',
                    display: 'flex',
                    justifyContent: 'center',
                    boxShadow: 'none'
                }}>
            <Toolbar>
                <Box sx={{flexGrow: 1}}>
                    <Button sx={{
                        color: Colors.Primary,
                        borderRadius: '10px',
                        background: Colors.Secondary,
                        border: '2px solid',
                        borderColor: Colors.Thirdly,
                        transition: "all 0.2s .12s",
                        fontSize: '17px',
                        "&:hover": {
                            background: Colors.Secondary,
                            borderColor: Colors.Primary,
                        }
                    }} onClick={toDuties}>
                        Услуги
                    </Button>
                    {location.pathname !== '/auth' &&
                        <Button onClick={toOrder} sx={{
                            color: Colors.Primary,
                            borderRadius: '10px',
                            background: Colors.Secondary,
                            border: '2px solid',
                            borderColor: Colors.Thirdly,
                            transition: "all 0.2s .12s",
                            fontSize: '17px',
                            marginLeft: '20px',
                            "&:hover": {
                                background: Colors.Secondary,
                                borderColor: Colors.Primary,
                            }
                        }}>
                            Сделать заказ
                        </Button>
                    }
                </Box>
                {location.pathname === '/duties'  &&
                    <AuthHandler sx={{flexGrow: 0}} user={user} accessToken={accessToken!}
                                 refreshToken={refreshToken!}/>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Nav;
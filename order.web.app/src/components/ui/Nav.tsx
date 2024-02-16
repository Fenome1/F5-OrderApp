import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Colors} from "../../common/Colors.ts";

const Nav = () => {
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
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Услуги
                </Typography>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Сделать заказ
                </Typography>
                <Button color="inherit">Войти?</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Nav;
import AuthForm from "./AuthForm.tsx";
import {Box, Card} from "@mui/material";
import {Colors} from "../../../common/Colors.ts";
import './style.scss'
import Nav from "../../ui/nav/Nav.tsx";

const AuthPage = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: "100vh"
        }}>
            <Nav/>
            <Box className='auth-box'>
                <Card className='auth-card' raised sx={{
                    filter: `drop-shadow(0 0 0.2rem ${Colors.Fourthly})`
                }}>
                    <AuthForm/>
                </Card>
            </Box>
        </Box>
    )
};

export default AuthPage;
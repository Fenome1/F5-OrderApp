import AuthForm from "./AuthForm.tsx";
import {Box, Card} from "@mui/material";
import {Colors} from "../../../common/Colors.ts";
import './style.scss'
import DefaultPage from "../../ui/DefaultPage.tsx";

const AuthPage = () => {
    return (
        <DefaultPage>
            <Box className='auth-box'>
                <Card className='auth-card' raised sx={{
                    filter: `drop-shadow(0 0 0.2rem ${Colors.Fourthly})`
                }}>
                    <AuthForm/>
                </Card>
            </Box>
        </DefaultPage>
    )
};

export default AuthPage;
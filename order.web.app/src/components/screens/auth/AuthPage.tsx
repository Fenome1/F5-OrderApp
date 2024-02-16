import AuthForm from "./AuthForm.tsx";
import {Card} from "@mui/material";
import {Colors} from "../../../common/Colors.ts";
import './style.css'

const AuthPage = () => {
    return (
        <Card className='auth-card' raised sx={{
            filter: `drop-shadow(0 0 0.7rem ${Colors.Fourthly})`
        }}>
            <AuthForm/>
        </Card>
    );
};

export default AuthPage;
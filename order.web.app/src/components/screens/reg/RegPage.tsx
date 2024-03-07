import './style.scss'
import {Box, Card} from "@mui/material";
import {Colors} from "../../../common/Colors.ts";
import RegForm from "./RegForm.tsx";
import DefaultPage from "../../ui/DefaultPage.tsx";

const RegPage = () => {
    return (
        <DefaultPage>
            <Box className='auth-box'>
                <Card className='auth-card' raised sx={{
                    filter: `drop-shadow(0 0 0.2rem ${Colors.Fourthly})`
                }}>
                    <RegForm/>
                </Card>
            </Box>
        </DefaultPage>
    );
};

export default RegPage;
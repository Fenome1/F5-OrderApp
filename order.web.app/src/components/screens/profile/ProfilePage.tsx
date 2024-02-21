import DefaultPage from "../DefaultPage.tsx";
import ProfileForm from "./ProfileForm.tsx";
import {Box, Card} from "@mui/material";
import {Colors} from "../../../common/Colors.ts";

const ProfilePage = () => {
    return (
        <DefaultPage>
            <Box sx={{height: '100%'}}>
                <Card className='profile-card' sx={{filter: `drop-shadow(0 0 0.2rem ${Colors.Fourthly})`}}>
                    <ProfileForm/>
                </Card>
            </Box>
        </DefaultPage>
    );
};

export default ProfilePage;
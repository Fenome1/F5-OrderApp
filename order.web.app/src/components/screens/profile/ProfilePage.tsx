import DefaultPage from "../../ui/DefaultPage.tsx";
import ProfileForm from "./ProfileForm.tsx";
import {Card} from "@mui/material";
import {Colors} from "../../../common/Colors.ts";

const ProfilePage = () => {
    return (
        <DefaultPage>
            <Card className='profile-card' sx={{filter: `drop-shadow(0 0 0.2rem ${Colors.Fourthly})`}}>
                <ProfileForm/>
            </Card>
        </DefaultPage>
    );
};

export default ProfilePage;
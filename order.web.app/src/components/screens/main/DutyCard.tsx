import {FC} from 'react';
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import {Colors} from "../../../common/Colors.ts";
import './style.css';

interface IDutyProps {
    image: string
    title: string
    description: string
}

const DutyCard: FC<IDutyProps> = (duty: IDutyProps) => {

    return (
        <Card className='duty-card'>
            <CardMedia
                sx={{height: 75}}
                image={duty.image}/>
            <CardContent>
                <Typography sx={{color: `${Colors.Fourthly}`}} variant="h4" gutterBottom>
                    {duty.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {duty.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DutyCard;
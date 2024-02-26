import {Box, IconButton, Typography} from "@mui/material";
import {Colors} from "../../common/Colors.ts";
import './style.scss'

const Futter = () => {
    return (
        <Box className='main-futter' sx={{
            backgroundColor: Colors.Fourthly,
            color: Colors.Primary,
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
            }}>
                <Typography variant="body2">© 2024 DIGITAL-АГЕНТСТВО F5</Typography>
            </Box>
            <Box>
                <IconButton sx={{
                    color: Colors.Primary,
                    textDecoration: "none",
                    fontSize: "18px",
                    fontWeight: 600,
                }}>
                    +7 (912) 345-67-89
                </IconButton>
            </Box>
        </Box>
    );
};

export default Futter;
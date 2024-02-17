import {Box, IconButton, Typography} from "@mui/material";
import {Colors} from "../../common/Colors.ts";

const Futter = () => {
    return (
        <Box sx={{
            backgroundColor: Colors.Fourthly,
            color: Colors.Primary,
            padding: "24px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: '80px'
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
            }}>
                <Typography variant="body2">© 2024 DIGITAL-АГЕНТСТВО F5</Typography>
            </Box>
            <Box>
                <IconButton href="tel:+7 8182 47 56 47" sx={{
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
import React, {FC} from 'react';
import Nav from '../ui/nav/Nav';
import Footer from "../ui/Futter.tsx";
import {Box} from "@mui/material";

interface IDefaultPageProps {
    children: React.ReactNode
}

const DefaultPage: FC<IDefaultPageProps> = (props) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: "100vh"
        }}>
            <Nav/>
            {props.children}
            <Footer/>
        </Box>
    );
};

export default DefaultPage;
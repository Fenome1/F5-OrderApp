import {CircularProgress} from "@mui/material";
import {Colors} from "../../common/Colors.ts";
import {FC} from "react";

interface LoadingCircProps {
    color?: Colors
}

const LoadingCirc: FC<LoadingCircProps> = ({color}) => {
    return (
        <CircularProgress sx={{
            display: 'flex',
            color: `${color ?? Colors.Secondary}`
        }} className='loading-circ'/>
    );
};

export default LoadingCirc;
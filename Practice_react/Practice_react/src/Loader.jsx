import {Box , CircularProgress } from "@mui/material";

export default function Loader ({text}){

    return (
        <Box>
            <CircularProgress 
            
            size={100}
            thickness={9}/>
            {text}
        </Box>
    )
}

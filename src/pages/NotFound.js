import React from "react";
//mui component
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';

const NotFound = () => {
    return (
        <Box mt={10}>
            <Container maxWidth="md">
                <Paper elevation={4} >
                    <Box display="flex" justifyContent="center" alignItems="center" >
                        <Box
                            fontSize="32px"
                            fontWeight="500"
                            mr={2} p={3}
                        >
                            Not Found!!!
                        </Box>
                        {/* <AccountCircleIcon fontSize="large" /> */}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
export default NotFound;
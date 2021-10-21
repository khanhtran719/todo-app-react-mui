import React from "react";
//mui component
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";
//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//avt
import avt from "../assets/avatar.jpg";
const AboutMe = () => {
    return (
        <Box mt={10} >
            <Container maxWidth="md">
                <Paper elevation={4} >
                    <Box display="flex" justifyContent="center" alignItems="center" >
                        <Box
                            fontSize="32px"
                            fontWeight="500"
                            mr={2}
                        >
                            About Me!
                        </Box>
                        <AccountCircleIcon fontSize="large" />
                    </Box>
                    <Box display="flex" justifyContent="center" mt={3} pb={3}>
                        <Box>
                            <Avatar
                                alt="Shiro Avata"
                                src={avt}
                                variant="square"
                                sx={{ width: 150, height: 150 }}
                            />
                        </Box>
                        <Box display="flex" sx={{m: "auto 0"}}>
                            <Box ml={2}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Họ và tên:
                                </Typography>
                                <Typography variant="h6" gutterBottom component="div">
                                    Mssv:
                                </Typography>
                                <Typography variant="h6" gutterBottom component="div">
                                    Khoa:
                                </Typography>
                            </Box>
                            <Box ml={2}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Trần Nguyên Khánh
                                </Typography>
                                <Typography variant="h6" gutterBottom component="div">
                                    45.01.104.110
                                </Typography>
                                <Typography variant="h6" gutterBottom component="div">
                                    Công nghệ thông tin
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
export default AboutMe;
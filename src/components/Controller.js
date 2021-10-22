import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import avt from "../assets/avatar.jpg";

import { MyContext } from "../contexts/MyContext";
const Controller = () => {
    const { todo } = useContext(MyContext);
    
    useEffect(() =>{
        localStorage.setItem("todos", JSON.stringify(todo));
    })
    return (
        <Paper
            elevation={24}
            square
            sx={{ width: 300, height: "100vh" }}
        >
            <Box pt={8}>
                <Avatar
                    alt="Shiro Avata"
                    src={avt}
                    sx={{ width: 100, height: 100, marginLeft: "auto", marginRight: "auto" }}
                />
                <Box
                    fontSize="20px"
                    fontWeight="600"
                    textAlign="center"
                    mt={1}
                >
                    Shiro
                </Box>
                <Box
                    width="50px"
                    height="1px"
                    marginLeft="auto"
                    marginRight="auto"
                    mt={-1}
                >
                    <hr style={{ border: "none", borderBottom: "3px solid red" }} />
                </Box>
                <Box
                    fontSize="16px"
                    fontWeight="600"
                    textAlign="center"
                    mt={1}
                >
                    A blog of third-year student!!!
                </Box>
            </Box>
            <Accordion
                disableGutters
                sx={{ width: 1, marginTop: 3 }}>
                <AccordionSummary
                    sx={{ width: 1, backgroundColor: "#898989" }}
                    expandIcon={<ExpandMoreIcon
                        sx={{ color: "white" }}
                    />}
                >
                    <Box
                        color="white"
                        fontSize="18px"
                        fontWeight="500"
                    >
                        To-Do
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Box display="flex" justifyContent="space-between">
                        <Link to="/" style={{textDecoration: "none", color: "black", padding: "8px"}}>To-do List</Link>
                        <FormatListNumberedIcon sx={{pt: 1, pb: 1}}/>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Link to="/timeline" style={{textDecoration: "none", color: "black", padding: "8px"}}>To-do TimeLine</Link>
                        <TimelineIcon sx={{pt: 1, pb: 1}}/>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Link to="/about-me" style={{textDecoration: "none", color: "black", padding: "8px", paddingBottom: 2}}>About me!</Link>
                        <AccountCircleIcon sx={{pt: 1}}/>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );

}

export default Controller;

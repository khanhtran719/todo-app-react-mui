import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
//timeline @mui/lab
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
//icon
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteIcon from "@mui/icons-material/Favorite";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
//myContext
import { MyContext } from "../contexts/MyContext";



const TimeLine = () => {
    const { todo, setTodo } = useContext(MyContext);

    const formatDate = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const dateObj = new Date(date);
        const month = monthNames[dateObj.getMonth()];
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
        const output = month + ' ' + day + ', ' + year;
        return output;
    }
    const onDeleteItem = (i) => {
        setTodo(todo.filter((item, index) => index !== i));
    }
    const containLeft = (item, index) => {
        return (
            <Paper elevation={4} sx={{ display: "flex", justifyContent: "space-between", p: "24px 40px" }}>
                <IconButton aria-label="delete" onClick={onDeleteItem.bind(this, index)}>
                    <DeleteIcon />
                </IconButton>
                <Box sx={{ m: "auto 0" }}>
                    <Box
                        fontSize="20px"
                        fontWeight="600"
                    >
                        {item.name}
                    </Box>
                    <Box>
                        {item.startTime} to {item.endTime}
                    </Box>
                    <Box>
                        {item.taskTime === "everyday" ? "Everyday" : formatDate(item.date)}
                    </Box>
                </Box>
            </Paper>
        );
    }
    const containRight = (item, index) => {
        return (
            <Paper elevation={4} sx={{ display: "flex", justifyContent: "space-between", p: "24px 40px" }}>
                <Box sx={{ m: "auto 0" }}>
                    <Box
                        fontSize="20px"
                        fontWeight="600"
                    >
                        {item.name}
                    </Box>
                    <Box>
                        {item.startTime} to {item.endTime}
                    </Box>
                    <Box>
                        {item.taskTime === "everyday" ? "Everyday" : formatDate(item.date)}
                    </Box>
                </Box>
                <IconButton aria-label="delete" onClick={onDeleteItem.bind(this, index)}>
                    <DeleteIcon />
                </IconButton>
            </Paper>
        );
    }
    const clearTimeline = () => {
        return (
            <Link 
                to="/"
                style={{
                    textDecoration: "none", 
                    fontSize: "30px", fontWeight: "500", 
                    color: "black", display: "flex", 
                    justifyContent: "center", marginTop: "24px",marginBottom: "-24px"}}    
            >
                Add new to-do <NavigateNextIcon fontSize="large" sx={{mt: 0.5}}/>
            </Link>
        );
    }
    return (
        <Box mt={10} >
            <Container maxWidth="md">
                <Paper elevation={4} >
                    <Box display="flex" justifyContent="center" alignItems="center"
                    >
                        <Box
                            fontSize="32px"
                            fontWeight="500"
                            mr={2}
                        >
                            To-do Timeline
                        </Box>
                        <AccessTimeIcon fontSize="large" />
                    </Box>
                    {todo.length === 0 ? clearTimeline() : ""}
                    <Timeline position="alternate" sx={{pb: 4}}>
                        {todo.map((item, index) => {
                            return (
                                <TimelineItem key={index}>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot 
                                            color={item.status === "done" ? "error" : item.status === "nodone" ? "warning" : "grey"} 
                                        >
                                            {item.status === "done" ? <FavoriteIcon /> : item.status === "nodone" ? <DoNotDisturbIcon /> : <LaptopMacIcon />}
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ m: 'auto 0' }}>
                                        {index % 2 === 0 ? containRight(item, index) : containLeft(item, index)}
                                    </TimelineContent>
                                </TimelineItem>
                            );
                        })}
                    </Timeline>
                </Paper>
            </Container>
        </Box>
    );
}

export default TimeLine;
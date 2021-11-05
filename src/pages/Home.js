import React, { useState, useContext } from "react";
//mui component
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//icon
import BorderColorIcon from '@mui/icons-material/BorderColor';
//mycontext
import { MyContext } from "../contexts/MyContext";
//component
import TodoList from "../components/TodoList";
import AddTaskForm from "../components/AddTask";
import EditTaskForm from "../components/EditTask";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const [addTask, setAddTask] = useState(false);
    const [editTask, setEditTask] = useState(false);
    const [mode, setMode] = useState("");
    const [idx, setIdx] = useState("");

    const { todo, setTodo } = useContext(MyContext);

    const openAddTask = () => {
        setAddTask(true);
    }
    const closeAddTask = () => {
        setAddTask(false);
    }

    const openEditTask = (i) => {
        setEditTask(true);
    }
    const closeEditTask = () => {
        setEditTask(false);
    }
    const sortDeadline = () => {
        setTodo([...todo].sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        }));
    }
    const clearTodo = () => {
        return (
            <Box
                fontSize="30px"
                fontWeight="500"
                textAlign="center"
                pt={3} pb={3}
            >
                <Button
                    size="small"
                    color="info"
                    variant="contained"
                    onClick={openAddTask}
                >
                    Add new task
                </Button>
            </Box>
        );
    }
    const activeTodo = () => {
        return (
            <Box>
                <Box display="flex" justifyContent="space-between" m={1} mt={3}>
                    <Button
                        size="small"
                        color="info"
                        variant="contained"
                        onClick={openAddTask}
                    >
                        Add new task
                    </Button>
                    <Box display="flex" justifyContent="space-between">
                        <Button
                            size="small"
                            color="info"
                            variant="contained"
                            onClick={sortDeadline}
                            sx={{ mr: 2 }}
                        >
                            Sort Deadline
                        </Button>
                        <FormControl >
                            <Select
                                sx={{ height: 30 }}
                                value={mode}
                                onChange={(event) => setMode(event.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">Today</MenuItem>
                                <MenuItem value="allday">All Day</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <TodoList openEditTask={openEditTask} setIdx={setIdx} mode={mode} />
            </Box>

        );
    }
    return (
        <Box mt={10} >
            <AddTaskForm addTask={addTask} closeAddTask={closeAddTask} setOpen={setOpen}/>
            <EditTaskForm editTask={editTask} closeEditTask={closeEditTask} idx={idx} setIdx={setIdx} />
            <Container maxWidth="md">
                <Paper elevation={4} >
                    <Box display="flex" justifyContent="center" alignItems="center"
                    >
                        <Box
                            fontSize="32px"
                            fontWeight="500"
                            mr={2}
                        >
                            To-do List
                        </Box>
                        <BorderColorIcon fontSize="large" />
                    </Box>
                    {todo.length === 0 ? clearTodo() : activeTodo()}
                </Paper>
            </Container>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Add new task had been successfully!
                    </Alert>
                </Snackbar>
            </Stack>
        </Box>
    );

}

export default Home;

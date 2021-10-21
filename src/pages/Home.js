import React, { useState, useContext } from "react";
//mui component
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
//icon
import BorderColorIcon from '@mui/icons-material/BorderColor';
//mycontext
import { MyContext } from "../contexts/MyContext";
//component
import TodoList from "../components/TodoList";
const Home = () => {
    const [date, setDate] = useState("");
    const [name, setName] = useState("");

    const { todo, setTodo } = useContext(MyContext);

    const handleUpdate = (event) => {
        event.preventDefault();
        if (name !== "" && date !== ""){
            setTodo([...todo, {
                name,
                date,
                completed: false
            }]);
            setDate(""); setName("");
        } else {
            alert("Please, Fill in the information!!!");
        }
    }
    const clearTodo = () => {
        return (
            <Box 
                fontSize="30px"
                fontWeight="500"
                textAlign="center"
                pt={3} pb={3}
            >
                Add new to-do
            </Box>
        );
    }
    const activeTodo = () => {
        return (
            <TodoList/>
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
                            To-do List
                        </Box>
                        <BorderColorIcon fontSize="large" />
                    </Box>
                    <form onSubmit={handleUpdate}>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <TextField
                                label="To-do Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                variant="outlined"
                                size="small"
                                sx={{ mr: 1 }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                type="date"
                                size="small"
                                label="Deadline"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="center" mt={1} mb={2}>
                            <Button
                                type="submit"
                                size="small"
                                color="error"
                                variant="contained"
                                sx={{ width: 425 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                    {todo.length === 0 ? clearTodo() : activeTodo()}
                </Paper>
            </Container>
        </Box>
    );

}

export default Home;

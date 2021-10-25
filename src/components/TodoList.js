import React, { useContext} from "react";
//mui component
// import Box from "@mui/material/Box";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Checkbox from "@mui/material/Checkbox";
//mui icon
import DeleteIcon from '@mui/icons-material/Delete';
//myContext
import { MyContext } from "../contexts/MyContext";

const TodoList = () => {
    const { todo, setTodo } = useContext(MyContext);
    const formatDate = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const dateObj = new Date(date);
        const month = monthNames[dateObj.getMonth()];
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
        const output = month + ' ' + day + ',' + year;
        return output;
    }
    const formatTime = (date) => {
        const dateObj = new Date(date);
        const hour = String(dateObj.getHours()).padStart(2, '0');
        const minute = String(dateObj.getMinutes()).padStart(2, '0');
        return hour + ":" + minute;
    }

    const onDeleteItem = (i) => {
        setTodo(todo.filter((item ,index) => index !== i));
    }
    const onCompletedItem = (i) => {
        let newTodo = [...todo];
        newTodo[i].completed = !newTodo[i].completed;
        setTodo(newTodo);
    }
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center">Number</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Deadline</TableCell>
                    <TableCell align="center">Completed</TableCell>
                    <TableCell align="center">Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {todo.map((item, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{item.name}</TableCell>
                            <TableCell align="center">{formatTime(item.date)}, {formatDate(item.date)}</TableCell>
                            <TableCell align="center">
                                <Checkbox
                                    checked={item.completed}
                                    onChange={onCompletedItem.bind(this, index)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <IconButton aria-label="delete" onClick={onDeleteItem.bind(this, index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

export default TodoList;
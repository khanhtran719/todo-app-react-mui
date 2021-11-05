import React, { useContext, useEffect, useState } from "react";
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
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
//myContext
import { MyContext } from "../contexts/MyContext";

const TodoList = ({openEditTask, setIdx, mode}) => {
    const [taskOfDay, setTaskOfDay] = useState([]);
    const { todo, setTodo } = useContext(MyContext);

    useEffect(() => {
        if (mode === "") {
            const today = new Date();
            const tmpTodo = todo.filter((item) => formatDate(item.date) === formatDate(today) || item.taskTime === "everyday");
            setTaskOfDay(tmpTodo);
        }
        else {
            setTaskOfDay(todo);
        }
    }, [mode, todo])

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
    
    const onEditTask = (i) => {
        openEditTask();
        setIdx(i);
    }
    const onDeleteItem = (i) => {
        setTodo(todo.filter((item) => item.id !== i));
    }
    const doneTask = (i) => {
        let newTodo = [...todo];
        let idx = newTodo.findIndex((item) => item.id === i);
        if (newTodo[idx].status === ""){
            newTodo[idx].status = "done";
        } else {
            newTodo[idx].status = "";
        }
        setTodo(newTodo);
    }
    const noDoneTask = (i) => {
        let newTodo = [...todo];
        let idx = newTodo.findIndex((item) => item.id === i);
        if (newTodo[idx].status === ""){
            newTodo[idx].status = "nodone";
        } else {
            newTodo[idx].status = "";
        }
        setTodo(newTodo);
    }
    return (
        <Table>
            <TableHead sx={{ backgroundColor: "#EEEEEE" }}>
                <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="center">Deadline</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="right">Edit/Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {taskOfDay.map((item, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell align="left">{item.name}</TableCell>
                            <TableCell align="center">{item.taskTime === "everyday" ? "Everyday" : formatDate(item.date)}</TableCell>
                            <TableCell align="center">{item.startTime} &rarr; {item.endTime}</TableCell>
                            <TableCell align="center">
                                {item.status === "nodone" ? "" :
                                    <Checkbox
                                        icon={<FavoriteBorderIcon />}
                                        checkedIcon={<FavoriteIcon color="error" />}
                                        checked={item.status === "done" ? true : false}
                                        onChange={doneTask.bind(this, item.id)}
                                        inputProps={{ 'aria-label': 'checkbox_done' }}
                                    />}
                                {item.status === "done" ? "" :
                                    <Checkbox
                                        icon={<DoNotDisturbIcon />}
                                        checkedIcon={<DoNotDisturbIcon color="warning" />}
                                        checked={item.status === "nodone" ? true : false}
                                        onChange={noDoneTask.bind(this, item.id)}
                                        inputProps={{ 'aria-label': 'checkbox_nodone' }}
                                    />}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="edit" size="small" onClick={onEditTask.bind(this, item.id)}>
                                    <EditIcon color="info" />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" onClick={onDeleteItem.bind(this, item.id)}>
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
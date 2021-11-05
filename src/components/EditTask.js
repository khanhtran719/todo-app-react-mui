import React, { useState, useContext, useEffect } from "react";
// mui component
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// my context
import { MyContext } from "../contexts/MyContext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditTask = ({ editTask, closeEditTask, idx, setIdx }) => {
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [taskTime, setTaskTime] = useState("aday");

    const { todo, setTodo } = useContext(MyContext);

    useEffect(() => {
        if (idx !== "") {
            let i = todo.findIndex((item) => item.id === idx);
            setDate(todo[i].date);
            setName(todo[i].name);
            setStartTime(todo[i].startTime);
            setEndTime(todo[i].endTime);
            setTaskTime(todo[i].taskTime);
        }
    }, [todo, idx])
    const handleUpdate = (event) => {
        event.preventDefault();
        if (name !== "" && date !== "" && startTime !== "" && endTime !== "") {
            let newTodo = [...todo];
            let i = newTodo.findIndex((item) => item.id === idx);
            newTodo[i].date = date;
            newTodo[i].name = name;
            newTodo[i].taskTime = taskTime;
            newTodo[i].startTime = startTime;
            newTodo[i].endTime = endTime;
            setTodo([...newTodo]);
            closeEditTask();
        } else {
            alert("Please, Fill in the information!!!");
        }
    }
    const cancelEditTask = () => {
        closeEditTask();
    }
    return (
        <Dialog
            open={editTask}
            TransitionComponent={Transition}
            onClose={closeEditTask}
        >
            <Box
                fontSize="32px"
                fontWeight="500"
                textAlign="center"
            >
                Edit Task
            </Box>
            <form onSubmit={handleUpdate}>
                <Box
                    width="500px"
                    p={2}
                >
                    <TextField
                        label="To-do Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true
                        }}
                        sx={{ width: 1 }}
                    />
                    <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
                        <FormLabel component="legend">How long?</FormLabel>
                        <RadioGroup
                            row aria-label="deadline"
                            name="row-radio-buttons-group"
                            value={taskTime}
                            onChange={(event) => setTaskTime(event.target.value)}
                        >
                            <FormControlLabel value="aday" control={<Radio />} label="A day" />
                            <FormControlLabel value="everyday" control={<Radio />} label="Every day" />
                            <FormControlLabel value="everyweek" control={<Radio />} label="Every week" disabled />
                        </RadioGroup>
                    </FormControl>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <TextField
                            type="date"
                            size="small"
                            label="Deadline"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ width: 49 / 100, mt: 2 }}
                        />
                        <Box display="flex" justifyContent="space-between" ml={2}>
                            <TextField
                                type="time"
                                size="small"
                                label="From"
                                value={startTime}
                                onChange={(event) => setStartTime(event.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ width: 49 / 100, mt: 2 }}
                            />
                            <TextField
                                type="time"
                                size="small"
                                label="To"
                                value={endTime}
                                onChange={(event) => setEndTime(event.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ width: 49 / 100, mt: 2 }}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            size="small"
                            color="error"
                            variant="contained"
                            onClick={cancelEditTask}
                            sx={{ mr: 2 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            size="small"
                            color="error"
                            variant="contained"
                        >
                            Update
                        </Button>

                    </Box>
                </Box>
            </form>
        </Dialog>
    );
}
export default EditTask;
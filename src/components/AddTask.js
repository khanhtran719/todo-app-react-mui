import React, { useState, useContext } from "react";
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

const AddTask = ({ addTask, closeAddTask, setOpen }) => {
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [taskTime, setTaskTime] = useState("aday");

    const { todo, setTodo } = useContext(MyContext);

    const createId = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    const checkTime = (a, b) => {
        let aHours = Number(a[0] + a[1]);  let aMinutes = Number(a[3] + a[4]);
        let bHours = Number(b[0] + b[1]);  let bMinutes = Number(b[3] + b[4]);
        if (aHours < bHours){
            return 0;
        } else if (aHours > bHours) {
            return 1;
        }  else {
            if (aMinutes <= bMinutes){
                return 0;
            }
            else {
                return 1;
            }
        }
    }
    const handleUpdate = (event) => {
        event.preventDefault();
        if (name !== "" && date !== "" && startTime !== "" && endTime !== "") {
            if (checkTime(startTime, endTime) === 0) {
                setTodo([...todo, {
                    id: createId(),
                    name,
                    date,
                    startTime,
                    endTime,
                    taskTime,
                    status: "",
                }]);
                setOpen(true);
                setDate(""); setName(""); setStartTime(""); setTaskTime("aday"); setEndTime("");
                closeAddTask();
            }
            else {
                alert("Time is invalid!!!");
            }
        } else {
            alert("Please, Fill in the information!!!");
        }
    }
    const cancelAddTask = () => {
        setDate(""); setName(""); setStartTime(""); setTaskTime("aday"); setEndTime("");
        closeAddTask();
    }
    return (
        <Dialog
            open={addTask}
            TransitionComponent={Transition}
            onClose={closeAddTask}
        >
            <Box
                fontSize="32px"
                fontWeight="500"
                textAlign="center"
            >
                Add New Task
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
                            <FormControlLabel value="everyweek" control={<Radio />} label="Every week" disabled/>
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
                            onClick={cancelAddTask}
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
                            Submit
                        </Button>

                    </Box>
                </Box>
            </form>
        </Dialog>
    );
}
export default AddTask;
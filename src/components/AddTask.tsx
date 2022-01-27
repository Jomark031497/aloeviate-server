import { Box, Button, Card, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { v4 } from "uuid";
import { useAppDispatch } from "../redux/store";
import { addTask } from "../redux/features/tasks/taskSlice";

const AddTask: React.FC = () => {
  const dispatch = useAppDispatch();
  const [openAddTask, setOpenAddTask] = useState(false);
  const [task, setTask] = useState({
    name: "",
    duration: "0",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.name || !task.duration) return;

    const newTask = {
      id: v4(),
      name: task.name,
      duration: parseInt(task.duration) * 60,
      isCompleted: false,
      isActive: false,
      elapsed: 0,
    };

    dispatch(addTask(newTask));
    setTask({ name: "", duration: "0" });
    setOpenAddTask(false);
  };

  return (
    <Box sx={{ mx: "auto" }}>
      {!openAddTask ? (
        <Card
          onClick={() => setOpenAddTask(!openAddTask)}
          sx={{
            m: "1rem auto",
            width: "258px",
            height: "90px",
            background: "white",
            borderRadius: "0.5rem",
            border: "2px dashed gray",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "lightgrey",
            "&:hover": { cursor: "pointer", opacity: "0.7" },
          }}
        >
          <AddIcon sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="textSecondary">
            Add Task
          </Typography>
        </Card>
      ) : (
        <Card
          component="form"
          onSubmit={handleSubmit}
          sx={{
            m: "1rem auto",
            width: "258px",
            height: "90px",
            background: "white",
            borderRadius: "0.5rem",
            border: "2px dashed gray",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: "0.5rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              size="small"
              placeholder="task name"
              fullWidth
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              InputLabelProps={{ style: { height: "0.5rem" }, shrink: true }}
              inputProps={{
                style: { height: "0.5rem", fontSize: "0.9rem" },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              type="number"
              size="small"
              value={task.duration}
              onChange={(e) => setTask({ ...task, duration: e.target.value })}
              InputProps={{
                inputProps: { min: 1 },
                style: { height: "1.5rem", fontSize: "0.9rem" },
              }}
            />
            <Button size="small" sx={{ ml: "0.3rem" }} onClick={() => setOpenAddTask(!openAddTask)}>
              Cancel
            </Button>
            <Button size="small" type="submit">
              Add
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default AddTask;

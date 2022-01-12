import { Box, Button, Card, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Task } from "../types";
import { v4 } from "uuid";
import axios from "axios";
import { mutate } from "swr";

const AddTask: React.FC = () => {
  const [openAddTask, setOpenAddTask] = useState(false);

  const [task, setTask] = useState<Task>({
    id: v4(),
    name: "",
    duration: "0",
    elapsed: "",
    isCompleted: false,
  });

  const handleAddTask = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    try {
      await axios.post("/tasks", task);
      mutate("/tasks");
    } catch (error) {
      console.error(error);
    }
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
            "&:hover": {
              cursor: "pointer",
              opacity: "0.7",
            },
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
          onSubmit={handleAddTask}
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
            <AddIcon sx={{ color: "text.secondary", fontSize: "2rem" }} />
            <TextField
              size="small"
              placeholder="task name"
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              sx={{ width: "65%", ml: "1.5rem" }}
              InputLabelProps={{ style: { height: "0.5rem" }, shrink: true }}
              inputProps={{
                style: { height: "0.5rem", fontSize: "0.9rem" },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              type="number"
              min="0"
              value={task.duration}
              onChange={(e) => setTask({ ...task, duration: e.target.value })}
              style={{ width: "50px", height: "30px", border: 0, textAlign: "center" }}
            />
            <Button size="small" onClick={() => setOpenAddTask(!openAddTask)}>
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

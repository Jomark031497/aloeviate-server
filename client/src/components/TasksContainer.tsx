import { Box } from "@mui/material";
import { v4 as uuid } from "uuid";
import TaskCard from "./TaskCard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CoffeeIcon from "@mui/icons-material/Coffee";
import MeetingIcon from "@mui/icons-material/Groups";

const TasksContainer = () => {
  const sampleTasks = [
    {
      id: uuid(),
      duration: "80:00:00",
      name: "My First Task",
      elapsed: "00:00",
      isCompleted: false,
      icon: <AssignmentIcon sx={{ fontSize: "2rem" }} />,
    },
    {
      id: uuid(),
      duration: "05:00",
      name: "Coffee Break",
      elapsed: "00:00",
      isCompleted: false,
      icon: <CoffeeIcon sx={{ fontSize: "2rem" }} />,
    },
    {
      id: uuid(),
      duration: "05:00",
      name: "Meeting with the devs",
      elapsed: "00:00",
      isCompleted: false,
      icon: <MeetingIcon sx={{ fontSize: "2rem" }} />,
    },
  ];

  return (
    <Box id="tasks-container" sx={{ mx: "auto" }}>
      {sampleTasks && sampleTasks.map((task) => <TaskCard task={task} key={task.id} />)}
    </Box>
  );
};

export default TasksContainer;

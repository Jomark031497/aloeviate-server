import { Box, Typography, IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Task } from "../types";

interface Props {
  tasks: Task[];
}

const Timer: React.FC<Props> = ({ tasks }) => {
  return (
    <Box id="timer-container">
      <Typography variant="h2" align="center">
        {tasks.length ? tasks[0].duration : "00:00"}
      </Typography>
      <Typography variant="h6" align="center">
        {tasks.length ? tasks[0].name : "no tasks"}
      </Typography>
      <Box id="timer-action-button" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6">-5</Typography>
        <IconButton sx={{ mx: "1rem" }}>
          <PlayCircleIcon sx={{ fontSize: "4rem" }} />
        </IconButton>
        <Typography variant="h6">+5</Typography>
      </Box>
    </Box>
  );
};

export default Timer;

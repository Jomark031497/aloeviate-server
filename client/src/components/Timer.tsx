import { Box, Typography, IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const Timer = () => {
  return (
    <Box id="timer-container">
      <Typography variant="h2" align="center">
        10:00
      </Typography>
      <Typography variant="h6" align="center">
        My First Task
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

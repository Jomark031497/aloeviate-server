import { Box, Typography, IconButton } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircle";

import { useState } from "react";
import PauseIcon from "@mui/icons-material/PauseCircle";

const Timer: React.FC = () => {
  const [playTimer, setPlayTimer] = useState(false);

  const toggleTimer = () => {
    setPlayTimer(!playTimer);
  };

  return (
    <Box id="timer-container">
      <Typography variant="h2" align="center">
        00:00
      </Typography>
      <Typography variant="h6" align="center">
        no tasks
      </Typography>
      <Box id="timer-action-button" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6">-5</Typography>
        <IconButton sx={{ mx: "1rem" }} onClick={toggleTimer}>
          {playTimer ? <PauseIcon sx={{ fontSize: "4rem" }} /> : <PlayIcon sx={{ fontSize: "4rem" }} />}
        </IconButton>
        <Typography variant="h6">+5</Typography>
      </Box>
    </Box>
  );
};

export default Timer;

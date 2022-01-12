import { Card, Box, Typography, CardContent, CardActions } from "@mui/material";
import { Task } from "../types";
import AssignmentIcon from "@mui/icons-material/Assignment";
import axios from "axios";
import { mutate } from "swr";

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`/tasks/${parseInt(id)}`);
      mutate("/tasks");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card sx={{ m: "0 auto 0.5rem auto", width: 260, height: 90 }}>
      <CardContent sx={{ display: "flex", height: "100%", padding: 0, "&:last-child": { paddingBottom: 0 } }}>
        <Box
          sx={{ flex: 0.4, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Box>
              <AssignmentIcon sx={{ fontSize: "2rem" }} />
            </Box>
            <Typography variant="body2">{task.duration}</Typography>
          </Box>
        </Box>
        <Box sx={{ flex: 1, p: "0.5rem", display: "flex", flexDirection: "column" }}>
          <Box sx={{ height: "80%", display: "flex", alignItems: "center" }}>
            <Typography variant="body2" noWrap>
              {task.name}
            </Typography>
          </Box>

          <CardActions disableSpacing sx={{ height: "20%", display: "flex", justifyContent: "space-between", p: 0 }}>
            <Typography
              variant="body2"
              color="textSecondary"
              onClick={() => deleteTask(task.id)}
              sx={{
                fontSize: "0.6rem",
                "&:hover": {
                  color: "primary.main",
                  cursor: "pointer",
                },
              }}
            >
              DELETE
            </Typography>
            <Typography
              color="textSecondary"
              sx={{
                fontSize: "0.6rem",
                "&:hover": {
                  color: "primary.main",
                  cursor: "pointer",
                },
              }}
            >
              RESET
            </Typography>
            <Typography
              color="textSecondary"
              sx={{
                fontSize: "0.6rem",
                "&:hover": {
                  color: "primary.main",
                  cursor: "pointer",
                },
              }}
            >
              COMPLETE
            </Typography>
            <Typography
              color="textSecondary"
              sx={{
                fontSize: "0.8rem",
              }}
            >
              {task.elapsed}
            </Typography>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

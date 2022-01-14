import { Card, Box, Typography, CardContent, CardActions } from "@mui/material";
import { Task } from "../types";
import AssignmentIcon from "@mui/icons-material/Assignment";
import axios from "axios";
import { useAppDispatch } from "../redux/store";
import { getTasks } from "../redux/features/tasks/getTasksSlice";
import { minsToTimeFormat } from "../lib/timeFormatter";

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`/tasks/${id}`, { withCredentials: true });
      dispatch(getTasks());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card
      sx={{ m: "0 auto 0.5rem auto", width: 260, height: 90, background: task.isCompleted ? "lightgreen" : "white" }}
    >
      <CardContent sx={{ display: "flex", height: "100%", padding: 0, "&:last-child": { paddingBottom: 0 } }}>
        <Box
          sx={{ flex: 0.4, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Box>
              <AssignmentIcon sx={{ fontSize: "2rem" }} />
            </Box>
            <Typography variant="body2">{minsToTimeFormat(task.duration)}</Typography>
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
              {minsToTimeFormat(task.elapsed)}
            </Typography>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

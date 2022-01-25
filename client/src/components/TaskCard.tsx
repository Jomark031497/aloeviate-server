import { Card, Box, Typography, CardContent, CardActions, styled, Button } from "@mui/material";
import { Task } from "../types";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { minsToTimeFormat } from "../lib/timeFormatter";

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
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
            <Typography variant="body2">{minsToTimeFormat(task.duration)}</Typography>
          </Box>
        </Box>
        <Box sx={{ flex: 1, p: "0.5rem", display: "flex", flexDirection: "column", width: "20%" }}>
          <Box sx={{ height: "80%", display: "flex", alignItems: "center" }}>
            <Typography variant="body2" noWrap>
              {task.name}
            </Typography>
          </Box>

          <CardActions disableSpacing sx={{ height: "20%", display: "flex", justifyContent: "space-between", p: 0 }}>
            <Button size="small" sx={{ fontSize: "0.6rem", p: 0, minWidth: 0 }}>
              DELETE
            </Button>
            <Button size="small" sx={{ fontSize: "0.6rem", p: 0, minWidth: 0 }}>
              RESET
            </Button>
            <Button size="small" sx={{ fontSize: "0.6rem", p: 0, minWidth: 0 }}>
              COMPLETE
            </Button>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

import { Card, Box, Typography, CardContent, CardActions } from "@mui/material";
import { Task } from "../types";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <Card
      sx={{
        mx: "auto",
        mb: "0.5rem",
        width: "260px",
        height: "90px",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          height: "100%",
          padding: 0,
          "&:last-child": {
            paddingBottom: 0,
          },
        }}
      >
        <Box
          sx={{
            flex: 0.4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Box>
              <AssignmentIcon sx={{ fontSize: "2rem" }} />
            </Box>
            <Typography variant="body2">{task.duration}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            p: "0.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ height: "80%", display: "flex", alignItems: "center" }}>
            <Typography variant="body2" noWrap>
              {task.name}
            </Typography>
          </Box>

          <CardActions disableSpacing sx={{ height: "20%", display: "flex", justifyContent: "space-between", p: 0 }}>
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: "0.6rem" }}>
              DELETE
            </Typography>
            <Typography color="textSecondary" sx={{ fontSize: "0.6rem" }}>
              RESET
            </Typography>
            <Typography color="textSecondary" sx={{ fontSize: "0.6rem" }}>
              COMPLETE
            </Typography>
            <Typography color="textSecondary" sx={{ fontSize: "0.8rem" }}>
              {task.elapsed}
            </Typography>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

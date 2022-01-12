import { Box, Card, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddTask: React.FC = () => {
  return (
    <Box sx={{ mx: "auto" }}>
      <Card
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
        }}
      >
        <AddIcon sx={{ color: "text.secondary" }} />
        <Typography variant="body2" color="textSecondary">
          Add Task
        </Typography>
      </Card>
    </Box>
  );
};

export default AddTask;

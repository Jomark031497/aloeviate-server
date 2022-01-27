import { Box, Typography } from "@mui/material";

const BottomActionButtons = () => {
  return (
    <Box
      id="button-action-buttons"
      sx={{ m: "1rem auto", width: "260px", height: "90px", display: "flex", justifyContent: "space-between" }}
    >
      <Typography color="textSecondary" sx={{ fontSize: "0.8rem" }}>
        Hide Completed
      </Typography>
      <Typography color="textSecondary" sx={{ fontSize: "0.8rem" }}>
        Clear All
      </Typography>
      <Typography color="textSecondary" sx={{ fontSize: "0.8rem" }}>
        Clear Completed
      </Typography>
    </Box>
  );
};

export default BottomActionButtons;

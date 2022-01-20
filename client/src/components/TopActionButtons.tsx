import { Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from "@mui/icons-material/Tune";

const TopActionButtons = () => {
  return (
    <Box
      id="top-action-buttons"
      sx={{ display: "flex", justifyContent: "space-between", p: "1rem 0.5rem", backgroundColor: "#fff" }}
    >
      <SettingsIcon />
      <TuneIcon />
    </Box>
  );
};

export default TopActionButtons;

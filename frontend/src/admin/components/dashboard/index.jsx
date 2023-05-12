import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import Header from "../../Layout/Header";
import Calendar from "../calendar/calendar";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      {/* GRID & CHARTS */}
      <Calendar />
    </Box>
  );
};

export default Dashboard;

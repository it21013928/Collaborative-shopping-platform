import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import Header from "../../layout/Header";

export default function () {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div>
      <Box marginLeft={"20px"}>
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="PRODUCT" subtitle="Welcome to your product" />
        </Box>

        {/* methna ghpn */}
      </Box>
    </div>
  );
}

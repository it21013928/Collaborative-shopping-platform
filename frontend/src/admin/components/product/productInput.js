import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../layout/Header";

const ProductInputForm = () => {
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
};
export default ProductInputForm;

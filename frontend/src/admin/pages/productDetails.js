import Topbar from "../Layout/Topbar";
import Sidebar from "../Layout/Sidebar";
import { Box } from "@mui/material";
import Header from "../Layout/Header";
import ProductDetails from "../components/product/productDetails/productDetails";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";

import "./pages.css";

export default function () {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <div className="slideBar">
            <Sidebar selected={"View All Products"} />
          </div>
          <main className="content">
            <Topbar />
            <Box m="20px">
              {/* HEADER */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Header title="PRODUCT" subtitle="Product Details" />
              </Box>
              {/* ///////////////////////////////////////////////////////////////////////////////////////////////////// */}
              <ProductDetails />
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

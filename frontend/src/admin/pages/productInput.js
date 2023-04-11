import { useState } from "react";
import Topbar from "../layout/Topbar";
import Sidebar from "../layout/Sidebar";
import ProductInput from "../components/product/productInput";
import "./style.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />

            <ProductInput />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

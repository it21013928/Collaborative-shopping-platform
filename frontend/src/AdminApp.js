import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./admin/Layout/Topbar";
import Sidebar from "./admin/Layout/Sidebar";
import Dashboard from "./admin/components/dashboard";
import Team from "./admin/components/team";
import Invoices from "./admin/components/invoices";
import Contacts from "./admin/components/contacts";

import Form from "./admin/components/form";

import FAQ from "./admin/components/faq";
import Calendar from "./admin/components/calendar/calendar";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./admin/theme";

import "./index.css";

function App() {
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
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />

              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

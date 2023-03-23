import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../Layout/Topbar";
import Sidebar from "../Layout/Sidebar";
import Dashboard from "../components/dashboard";
import { Box } from "@mui/material";
import Header from "../Layout/Header";

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
          <Sidebar selected={"Dashboard"} />
          <main className="content">
            <Topbar />
            <Box m="20px">
              {/* HEADER */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Header
                  title="DASHBOARD"
                  subtitle="Welcome to your dashboard"
                />
              </Box>
              <Dashboard />
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

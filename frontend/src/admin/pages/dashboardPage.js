import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { myAccount } from "../../api/user";
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
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async (token) => {
      try {
        if (token) {
          const userData = await myAccount(token);
          if (userData.role == "seller-pending" || userData.role == "client") {
            navigate("/login-register");
            window.location.reload();
          } else {
            setUser(userData);
          }
        } else {
          navigate("/login-register");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser(token);
  }, []);

  return (
    <>
      {user ? (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <div className="slideBar">
                <Sidebar selected={"Dashboard"} />
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
      ) : (
        <></>
      )}
    </>
  );
}

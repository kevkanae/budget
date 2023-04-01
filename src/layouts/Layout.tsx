import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";
import { exists, BaseDirectory } from "@tauri-apps/api/fs";
import { useState, useEffect, useCallback } from "react";

const Layout = () => {
  const [indexFileExists, setIndexFileExists] = useState<boolean>(false);

  const root: SxProps = {
    height: "100vh",
    width: "100%",
    display: "grid",
    gridTemplateRows: "8vh 92vh",
  };

  const main: SxProps = {
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "4vw 96vw",

    bgcolor: "background.default",
  };

  const checkUser = useCallback(async () => {
    const isExistingUser = await exists("index.json", {
      dir: BaseDirectory.AppLocalData,
    });
    setIndexFileExists(isExistingUser);
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <Box sx={root}>
      <Header />
      <Box sx={main}>
        <Sidebar />
        {indexFileExists ? <Outlet /> : <Navigate to="/" />}
      </Box>
    </Box>
  );
};

export default Layout;

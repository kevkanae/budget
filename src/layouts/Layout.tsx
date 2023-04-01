import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";
import { exists, BaseDirectory } from "@tauri-apps/api/fs";
import { useState, useEffect, useCallback } from "react";
import Loader from "../components/Loader/Loader";
import { notify } from "../utils/Notify";

const Layout = () => {
  const [indexFileExists, setIndexFileExists] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

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
    try {
      setLoading(true);
      const isExistingUser = await exists("index.json", {
        dir: BaseDirectory.Download,
      }).finally(() => setLoading(false));
      setIndexFileExists(isExistingUser);
    } catch (error) {
      console.log(error);
      notify("error", "Something went wrong");
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  if (isLoading) return <Loader height={"100vh"} width={"100%"} />;

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

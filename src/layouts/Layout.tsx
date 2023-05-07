import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";

const Layout = () => {
  const root: SxProps = {
    height: "100vh",
    width: "100%",
    display: "flex",

    bgcolor: "background.default",
  };

  const sidebarWrapper: SxProps = {
    width: { xs: "0vw", md: "14vw" },
    display: { xs: "none", md: "block" },
  };

  const outletWrapper: SxProps = {
    width: { xs: "100vw", md: "86vw" },
  };

  return (
    <Box sx={root}>
      <Box sx={sidebarWrapper}>
        <Sidebar />
      </Box>
      <Box sx={outletWrapper}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

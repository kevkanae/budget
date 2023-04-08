import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";

const Layout = () => {
  const root: SxProps = {
    height: "100vh",
    width: "100%",
    display: "grid",
    gridTemplateColumns: {
      xs: "0 100vw",
      md: "14vw 86vw",
    },

    bgcolor: "background.default",
  };

  return (
    <Box sx={root}>
      <Sidebar />
      <Outlet />
    </Box>
  );
};

export default Layout;

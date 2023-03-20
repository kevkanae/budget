import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";

const Layout = () => {
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

  return (
    <Box sx={root}>
      <Header />
      <Box sx={main}>
        <Sidebar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

import { Outlet } from "@tanstack/react-router";
import { CSSProperties } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = () => {
  const root: CSSProperties = {
    height: "100vh",
    width: "100%",

    display: "grid",
    gridTemplateRows: "auto 1fr",
  };

  const main: CSSProperties = {
    height: "100%",
    width: "100%",

    display: "grid",
    gridTemplateColumns: "15% 85%",
  };

  return (
    <div style={root}>
      <Header />
      <div style={main}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

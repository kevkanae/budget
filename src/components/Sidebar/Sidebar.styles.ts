import { SxProps } from "@mui/material/styles";

const root: SxProps = {
  width: "100%",
  height: "100%",
  backgroundColor: "primary.main",
};

const item: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  height: "10vh",
  width: "100%",
  position: "relative",
};

export const sidebarStyles = {
  root,
  item,
};

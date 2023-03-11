import { SxProps } from "@mui/material/styles";
import { Colors } from "../../styles/Variables";

const root: SxProps = {
  height: "100%",
  width: "100%",
  backgroundColor: "primary.main",
  color: "#fff",
  padding: "1rem 1.4rem",
  display: "flex",
  justifyContent: "space-between",
};

const brand: SxProps = {
  fontSize: "1.5rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1rem",
};

const actions: SxProps = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  position: "relative",
};

const profiles: React.CSSProperties = {
  padding: "0.5rem 0.7rem",
  borderRadius: "0.2rem",
  backgroundColor: "#fff",
  color: Colors.dark,
  outline: "none",
};

const settings: React.CSSProperties = {
  height: "100%",
  cursor: "pointer",
};

const popover: SxProps = {
  backgroundColor: "#fff",
  color: "primary.main",
  position: "absolute",
  top: "100%",
  right: 0,

  fontSize: "0.75rem",
  padding: "0.5rem 0.7rem",
  borderRadius: "0.2rem",
  fontWeight: 600,
  whiteSpace: "nowrap",

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#ccc",
  },
};

export const headerStyles = {
  root,
  brand,
  actions,
  profiles,
  settings,
  popover,
};

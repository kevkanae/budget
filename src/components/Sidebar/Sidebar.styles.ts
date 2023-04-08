import { SxProps } from "@mui/material/styles";

const root: SxProps = {
  width: "100%",
  height: "100%",
  backgroundColor: "paper.default",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  py: 7,
  px: 2,
  gap: 2,
  borderRight: "1px solid #555",
};

const avatarWrapper: SxProps = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
};

const brand: SxProps = {
  fontSize: "1.7rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 1,
  color: "transparent",

  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  backgroundImage: "url('/bg.png')",
  backgroundSize: "contain",
};

const item: SxProps = {
  display: "flex",
  alignItems: "center",
  pl: 3,
  gap: 2,
  height: "10vh",
  width: "100%",
  "&:hover": {
    cursor: "pointer",
    color: "primary.main",
  },
};

const actions: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "1rem",

  width: "100%",
  flex: 1,
};

const profiles: SxProps = {
  padding: "0.5rem 0.7rem",
  borderRadius: "0.2rem",
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

export const sidebarStyles = {
  root,
  avatarWrapper,
  brand,
  item,
  actions,
  profiles,
  settings,
  popover,
};

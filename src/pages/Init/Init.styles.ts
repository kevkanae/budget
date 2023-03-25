import { SxProps } from "@mui/material/styles";

const root: SxProps = {
  height: "100vh",
  width: "100%",
  display: "flex",
};

const left: SxProps = {
  height: "100%",
  width: "50%",
  borderRight: "1px solid #ffffff1f",

  display: {
    xs: "none",
    md: "flex",
  },
  justifyContent: "center",
  alignItems: "center",
};

const title: SxProps = {
  fontSize: "5.6rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.7rem",
  color: "transparent",

  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  backgroundImage: "url('/bg.png')",
  backgroundSize: "contain",
};

const right: SxProps = {
  height: "100%",
  width: {
    xs: "100%",
    md: "50%",
  },
  px: "4vw",
  pt: "12vh",
  pb: "4vh",

  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
};

const header: SxProps = {
  fontSize: "1.9rem",
  fontWeight: 600,
  mb: 1,
  textTransform: "uppercase",
  letterSpacing: "0.1rem",
};

const content: SxProps = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1.4rem",
};

const addPaper: SxProps = {
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "100%",
};

const input: SxProps = {
  ml: 1,
  flex: 1,
};

const list: SxProps = {
  overflowY: "auto",
  borderRadius: "0.5rem",
  p: 2,
};

const listItem: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: "1.4rem",
};

const colorCard: SxProps = {
  height: "35px",
  width: "56px",
  borderRadius: "0.5rem",
  boxShadow: 7,
};

const addButton: SxProps = {
  p: "0.7rem",
};

export const initStyles = {
  root,
  left,
  title,
  right,
  header,
  addPaper,
  input,
  list,
  listItem,
  colorCard,
  addButton,
  content,
};

import { SxProps } from "@mui/material/styles";

const root: SxProps = {
  minHeight: "10vh",
  width: "49%",

  display: "flex",
  flexDirection: "column",
  p: "1.4rem",
};

const header: SxProps = {
  fontSize: "1.4rem",
  fontWeight: 600,
  mb: "1.4rem",
  color: "secondary.main",
};

const content: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: "1.4rem",
};

const addPaper: SxProps = {
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "25vw",
};

const input: SxProps = {
  ml: 1,
  flex: 1,
};

const addButton: SxProps = {
  p: "0.7rem",
};

export const addAccountStyles = {
  root,
  header,
  addPaper,
  input,
  addButton,
  content,
};

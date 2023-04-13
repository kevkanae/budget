import { SxProps } from "@mui/material/styles";
import { CSSProperties } from "react";

const root: SxProps = {
  minHeight: "10vh",
  width: "49%",

  display: "flex",
  flexDirection: "column",
  p: "1.4rem",
};

const top: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: "1.4rem",
};

const header: SxProps = {
  fontSize: "1.4rem",
  fontWeight: 600,
  color: "secondary.main",
  textTransform: "capitalize",
};

const content: SxProps = {
  width: "100%",
};

const form: CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1.4rem",
};

const subform: CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // gap: "1.4rem",
};

const input: SxProps = {
  ml: 1,
  flex: 1,
};

const addButton: SxProps = {
  p: "0.7rem",
};

export const addEntryStyles = {
  root,
  top,
  header,
  content,
  form,
  subform,
  input,
  addButton,
};

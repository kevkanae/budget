import { SxProps } from "@mui/material/styles";
import { CSSProperties } from "react";

const root: SxProps = {
  height: "100%",
  width: "100%",
  color: "primary.main",
  display: "flex",
  flexDirection: "column",
  p: "1.4rem",
};

const title: SxProps = {
  fontSize: "1.6rem",
  fontWeight: 500,
};

const span: CSSProperties = {
  fontSize: "1.6rem",
  fontWeight: 600,
  // color: Colors.secondary,
};

const subtitle: SxProps = {
  fontSize: "1.2rem",
  fontWeight: 500,
};

export const splashStyles = {
  root,
  title,
  span,
  subtitle,
};

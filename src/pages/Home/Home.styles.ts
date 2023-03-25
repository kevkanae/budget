import { SxProps } from "@mui/material/styles";

const root: SxProps = {
  height: "100%",
  width: "100%",
  // backgroundColor: Colors.light,
  display: "flex",
  flexDirection: "column",
  p: "1.4rem",
};

const h3: SxProps = {
  fontSize: "1.6rem",
  fontWeight: 600,
  color: "secondary.main",
};

const summary: SxProps = {
  my: "1rem",
  fontSize: "0.75rem",
  // color: Colors.grey,
};

const cardWrapper: SxProps = {
  height: "28vh",
  width: "100%",
  py: "0.7rem",
  my: "0.5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1.4rem",
};

const card: SxProps = {
  height: "100%",
  width: "30vw",
  p: "0.7rem",
  borderRadius: "0.2rem",
  boxShadow: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const cardHeader: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const cardOverview: SxProps = {
  fontSize: "0.75rem",
};

const cardFooter: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: "0.7rem",
};

const cardLink: SxProps = {
  // color: Colors.grey,
  "&:hover": {
    // color: Colors.secondary,
    cursor: "pointer",
  },
};

const graph: SxProps = {};

const green: SxProps = {
  color: "#1f961f",
  fontWeight: 600,
};

const red: SxProps = {
  color: "#e71717",
  fontWeight: 600,
};

export const homeStyles = {
  root,
  h3,
  summary,
  cardWrapper,
  card,
  cardHeader,
  cardOverview,
  cardFooter,
  cardLink,
  graph,
  green,
  red,
};

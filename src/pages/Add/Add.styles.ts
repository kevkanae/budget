import { SxProps } from "@mui/material/styles";

const root: SxProps = {
  height: "100%",
  width: "100%",
  color: "primary.main",
  display: "flex",
  flexDirection: "column",
  p: "1.4rem",
  gap: "0.7rem",
};

const header: SxProps = {
  height: "10vh",
  width: "100%",
  borderBottom: "1px solid #888",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const h3: SxProps = {
  fontSize: "2.1rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1rem",
};

const listWrapper: SxProps = {
  width: "100%",
  height: "63vh",
  mt: 2,
  overflowY: "auto",
  px: 2,
  py: 1,
};

const listItem: SxProps = {
  height: "140px",
  width: "100%",
  mb: 1,
  p: 2,
  boxShadow: 3,

  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "75% 20% 5%",
};

const left: SxProps = {
  height: "100%",
  minWidth: "84%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flex: 1,
  gap: 1,
};

const mid: SxProps = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const right: SxProps = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 3,
};

const title: SxProps = {
  fontSize: "1.4rem",
  fontWeight: 600,
};

const comment: SxProps = {
  color: "primary.main",
  fontSize: "0.875rem",
};

const date: SxProps = {
  fontSize: "0.75rem",
  color: "text.secondary",
};

const amount: SxProps = {
  fontSize: "1.7rem",
};

const paginationWrapper: SxProps = {
  width: "100%",
  display: "grid",
  placeItems: "center",
};

const noData: SxProps = {
  ...listWrapper,
  display: "grid",
  placeItems: "center",
  textTransform: "capitalize",
};

export const addStyles = {
  root,
  header,
  h3,
  listWrapper,
  listItem,
  left,
  mid,
  right,
  title,
  comment,
  date,
  amount,
  paginationWrapper,
  noData,
};

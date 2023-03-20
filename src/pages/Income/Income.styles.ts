import { SxProps } from "@mui/material/styles";
import { Colors } from "../../styles/Variables";

const root: SxProps = {
  height: "100%",
  width: "100%",
  backgroundColor: Colors.light,
  color: "primary.main",
  display: "flex",
  flexDirection: "column",
  p: "1.4rem",
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
  fontSize: "1.6rem",
  fontWeight: 600,
};

const tableWrapper: SxProps = {
  width: "100%",
  flexGrow: 1,
  mt: 2,
};

export const incomeStyles = {
  root,
  header,
  h3,
  tableWrapper,
};

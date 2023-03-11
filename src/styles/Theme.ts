import { createTheme } from "@mui/material/styles";
import { Colors } from "./Variables";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
  typography: {},
});

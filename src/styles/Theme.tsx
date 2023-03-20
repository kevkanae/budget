import { ReactNode, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";
import { useThemeStore } from "../utils/UseThemeStore";

const lightThemeToken = {
  primary: {
    main: "#9BDEE8",
  },
  secondary: {
    main: "#E8A59b",
  },
  background: {
    default: "#FFF",
  },
  text: {
    primary: "#010101",
    secondary: "#5A6571",
  },
};

const darkThemeToken = {
  primary: {
    main: "#9BE8CC",
  },
  secondary: {
    main: "#E89BB7",
  },
  background: {
    default: "#010101",
  },
  text: {
    primary: "#FFF",
    secondary: "#AAA",
  },
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light" ? lightThemeToken : darkThemeToken),
  },
});

const AppTheme = ({ children }: { children: ReactNode }) => {
  const prefersDarkMode = useThemeStore((state) => state.prefersDarkMode);
  localStorage.setItem("theme", prefersDarkMode ? "dark" : "light");

  const theme = useMemo(
    () => createTheme(getDesignTokens(prefersDarkMode ? "dark" : "light")),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;

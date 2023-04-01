import { ReactNode, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";
import { useThemeStore } from "../utils/UseThemeStore";

const lightThemeToken = {
  primary: {
    main: "#742bE4",
  },
  secondary: {
    main: "#EEE8FF",
  },
  background: {
    default: "#EBF1F4",
  },
  text: {
    primary: "#242424",
  },
};

const darkThemeToken = {
  primary: {
    main: "#742bE4",
  },
  secondary: {
    main: "#EEE8FF",
  },
  background: {
    default: "#111516",
  },
  text: {
    primary: "#FFFFFF",
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

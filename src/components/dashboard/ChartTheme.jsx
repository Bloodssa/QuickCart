import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ACCENT } from "../../lib/dashboard";

const theme = createTheme({
    typography: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
    palette: { primary: { main: ACCENT }, text: { primary: "#111827", secondary: "#4b5563" } },
});

export default function ChartTheme({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
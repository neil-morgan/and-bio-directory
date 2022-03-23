import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "#root": {}
      }
    }
  },

  palette: {
    primary: {
      main: "#D82036"
    },
    secondary: {
      main: "#1f73c2"
    },
    error: {
      main: red.A400
    }
  }
});

export { modalBoxStyle } from "./styles";

import { red, blue, green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "#root": {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }
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

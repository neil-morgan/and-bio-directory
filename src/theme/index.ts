import { red, blue, green, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "#root": {
          display: "flex"
        }
      }
    }
  },

  palette: {
    primary: {
      main: blue[500]
    },
    secondary: {
      main: green[500]
    },
    error: {
      main: red.A400
    }
  }
});

export { modalBoxStyle } from "./styles";

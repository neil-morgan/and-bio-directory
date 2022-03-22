import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { App } from "components/pages";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { theme } from "theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

(() => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:
      process.env.NODE_ENV === "production"
        ? "https://and-bio-directory.herokuapp.com/"
        : "http://localhost:4000/graphql"
  });

  ReactDOM.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CssBaseline />
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </StrictMode>,
    document.querySelector("#root")
  );
})();

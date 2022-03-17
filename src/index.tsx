import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Data } from "components";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { theme } from "theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

(() => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    // http://localhost:4000/graphql
    // https://and-bio-directory.herokuapp.com/
    uri: "http://localhost:4000/graphql",
  });

  ReactDOM.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Data />
        </ThemeProvider>
      </ApolloProvider>
    </StrictMode>,
    document.querySelector("#root")
  );
})();

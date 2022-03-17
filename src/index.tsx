import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Data } from "components";
import { StrictMode } from "react";
import ReactDOM from "react-dom";

(() => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://and-bio-directory.herokuapp.com/",
  });

  ReactDOM.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <Data />
      </ApolloProvider>
    </StrictMode>,
    document.querySelector("#root")
  );
})();

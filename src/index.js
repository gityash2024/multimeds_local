import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, ApolloLink } from "@apollo/client";

export const httpLink = createHttpLink({
  uri: 'https://api.mymultimeds.com/graphql', // Your production GraphQL endpoint URI
  // uri: 'http://localhost:3030/graphql', // Your local GraphQL endpoint URI
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // Retrieve the token from local storage every time a request is made
  const token = localStorage.getItem('token');
  // console.log(token, '++++++ ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

  // Add the token to the headers
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AppContext>
        <App />
       
      </AppContext>
    </BrowserRouter>
  </ApolloProvider>
);

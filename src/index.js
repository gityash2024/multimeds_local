import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, ApolloLink } from "@apollo/client";

const token = localStorage.getItem('token');

// const client = new ApolloClient({
//   uri: 'http://localhost:3030/graphql',
//   //  uri:'https://apiuat.reeroute.in/graphql',
//   cache: new InMemoryCache()
// })

export const httpLink = createHttpLink({
  // uri: 'http://localhost:3030/graphql', // Your GraphQL endpoint URI
   uri: 'https://api.mymultimeds.com/graphql', // Your production GraphQL endpoint URI
 });
 
 const authMiddleware = new ApolloLink((operation, forward) => {
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

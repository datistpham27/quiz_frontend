import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContainerSocket from './ContainerSocket/ContainerSocket';
import { HelmetProvider } from "react-helmet-async"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink
} from "@apollo/client"
import { getMainDefinition } from '@apollo/client/utilities';

import { createClient } from "graphql-ws"
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import "./style.sass"
import "./responsive.sass"
import "./transition.sass"
import "./eff.sass"

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/subscriptions',
  connectionParams: {
  }
}));
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/api/graphql'
});


const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  uri: 'http://localhost:4000/api/graphql',
  cache: new InMemoryCache(),
  link: splitLink
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <ContainerSocket>
        <App />
      </ContainerSocket>
    </HelmetProvider>
  </ApolloProvider>
);

reportWebVitals();

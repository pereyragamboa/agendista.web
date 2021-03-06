import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import './index.css';
import App from './components/app';
import Resolvers from './data/resolvers';
import introspectionQueryResultData from './fragmentTypes'; // generated with graphql-codegen
import { uri } from './serverData.js';
import * as serviceWorker from './serviceWorker';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});
const cache = new InMemoryCache({ fragmentMatcher });
cache.writeData({
  data: {
    //getAllCustomers: []
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, location, path}) => {
          console.log(`GQL error: ${message}; location: ${location}; path: ${path}`);
        });
      }
      if (networkError) {
        console.log(`Network error: ${networkError.message}; location: ${networkError.location}; path: ${networkError.path}`);
      }
    }),
    new HttpLink({
      uri: uri,
      credentials: 'same-origin'
    }),
  ]),
  cache,
  resolvers: Resolvers
});

ReactDOM.render(<App client={client} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
